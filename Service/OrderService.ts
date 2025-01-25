import prisma from "../prisma/Client";
export async function addOrder(orderDto: { customerId: number; orderDetails: any[] }) {
    console.log('Received orderDto:', orderDto);

    try {
        const { customerId, orderDetails } = orderDto;


        if (!customerId || !orderDetails || orderDetails.length === 0) {
            throw new Error('Invalid input. Provide a customerId and at least one order detail.');
        }

        // Wrap in transaction
        await prisma.$transaction(async (prisma) => {
            // Extract item IDs from orderDetails
            const itemIds = orderDetails.map((detail) => detail.ItemID);


            const items = await prisma.item.findMany({
                where: {
                    ItemID: { in: itemIds },
                },
                select: {
                    ItemID: true,
                    Price: true,
                    Quantity: true,
                },
            });

            // Map items to a Map object for quick access
            const itemMap = new Map(
                items.map((item) => [
                    item.ItemID,
                    {
                        price: item.Price,
                        stock: item.Quantity,
                    },
                ])
            );

            // Prepare orderDetails with calculated prices
            const orderDetailsWithTotal = orderDetails.map((detail) => {
                const itemData = itemMap.get(detail.ItemID);

                if (!itemData) {
                    throw new Error(`Invalid ItemID: ${detail.ItemID}. No matching item found.`);
                }

                if (itemData.stock < detail.Quantity) {
                    throw new Error(
                        `Insufficient stock for ItemID: ${detail.ItemID}. Available: ${itemData.stock}, Requested: ${detail.Quantity}`
                    );
                }


                const price = itemData.price;
                // @ts-ignore
                if (price === null || price === undefined || isNaN(price)) {
                    throw new Error(`Invalid price for ItemID: ${detail.ItemID}.`);
                }

                // check the quentity
                const quantity = detail.Quantity;
                if (isNaN(quantity) || quantity <= 0) {
                    throw new Error(`Invalid quantity for ItemID: ${detail.ItemID}.`);
                }


                return {
                    ItemID: detail.ItemID,
                    Quantity: quantity,
                    // @ts-ignore
                    Price: price * quantity,
                };
            });

            // Update stock in the database
            for (const detail of orderDetailsWithTotal) {
                const currentStock = itemMap.get(detail.ItemID)?.stock || 0;
                await prisma.item.update({
                    where: { ItemID: detail.ItemID },
                    data: {
                        Quantity: currentStock - detail.Quantity,
                    },
                });
            }


            await prisma.order.create({
                data: {
                    OrderDate: new Date(),
                    Customer: {
                        connect: {
                            CustomerID: customerId,
                        },
                    },
                    OrderDetails: {
                        create: orderDetailsWithTotal,
                    },
                },
            });
        });

        console.log('Order successfully created and stock updated!');
    } catch (err: any) {
        console.error('Error creating order:', err.message || err);
    }
}
export async function deleteOrder(id: number) {
    try {
        const result = await prisma.order.deleteMany({
            where: { OrderID: id },
        });

        if (result.count === 0) {
            console.log(`No order found with ID ${id}.`);
        } else {
            console.log(`Order with ID ${id} has been deleted.`);
        }
    } catch (err) {
        console.error("Error deleting order:"+ err);
        throw err;
    }
}

