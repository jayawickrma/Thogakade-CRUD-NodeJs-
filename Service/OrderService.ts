import prisma from "../prisma/Client";
export async function addOrder(orderDto: { customerId: number; orderDetails: any[] }) {
    console.log('Received orderDto:', orderDto);

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
                items.map((item) => [item.ItemID, { price: item.Price, stock: item.Quantity }])
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

                return {
                    ItemID: detail.ItemID,
                    Quantity: detail.Quantity,
                    Price: detail.Price * detail.Quantity,
                };
            });


            for (const detail of orderDetails) {
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
