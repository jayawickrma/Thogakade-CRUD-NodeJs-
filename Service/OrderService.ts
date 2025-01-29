import prisma from "../prisma/Client";
export async function addOrder(orderDto: { customerId: number; orderDetails: any[] }) {
    console.log('Received orderDto:', orderDto);
    // @ts-ignore
    const notifications = [];

    try {
        const { customerId, orderDetails } = orderDto;

        if (!customerId || !orderDetails || orderDetails.length === 0) {
            throw new Error('Invalid input. Provide a customerId and at least one order detail.');
        }


        await prisma.$transaction(async (prisma) => {
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

            const itemMap = new Map(
                items.map((item) => [
                    item.ItemID,
                    {
                        price: item.Price,
                        stock: item.Quantity,
                    },
                ])
            );

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
                if (price === null || price === undefined || isNaN(price)) {
                    throw new Error(`Invalid price for ItemID: ${detail.ItemID}.`);
                }

                const quantity = detail.Quantity;
                if (isNaN(quantity) || quantity <= 0) {
                    throw new Error(`Invalid quantity for ItemID: ${detail.ItemID}.`);
                }

                return {
                    ItemID: detail.ItemID,
                    Quantity: quantity,
                    Price: price * quantity,
                };
            });

            for (const detail of orderDetailsWithTotal) {
                const currentStock = itemMap.get(detail.ItemID)?.stock || 0;
                const updatedStock = currentStock - detail.Quantity;

                await prisma.item.update({
                    where: { ItemID: detail.ItemID },
                    data: {
                        Quantity: updatedStock,
                    },
                });

                // If stock is low, add a notification
                if (updatedStock < 10) {
                    const notification = await sendLowStockNotification(detail.ItemID, updatedStock);
                    notifications.push(notification);
                }
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
        return {
            success: true,
            message: 'Order successfully created and stock updated!',
            // @ts-ignore
            notifications: notifications,
        };
    } catch (err: any) {
        console.error('Error creating order:', err.message || err);
        return {
            success: false,
            message: err.message || 'Error creating order.',
            // @ts-ignore
            notifications: notifications,
        };
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


// A generic function to send notifications
async function sendLowStockNotification(itemId: number, remainingStock: number) {
    try {
        // Prepare the notification message
        const message = `ItemID ${itemId} is running low on stock. Only ${remainingStock} units remaining.`;

        return {
            success: true,
            message: message,
            itemId: itemId,
            remainingStock: remainingStock,
        };
    } catch (error) {

        return {
            success: false,
            message: `Failed to send low stock notification for ItemID: ${itemId}`,
            // @ts-ignore
            error: error.message || error,
        };
    }
}
