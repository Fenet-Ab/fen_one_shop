import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }
    async createOrderFromCart(userId: string) {

        // 1️⃣ Find user cart
        const cart = await this.prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: {
                        material: true,
                    },
                },
            },
        });

        if (!cart || cart.items.length === 0) {
            throw new BadRequestException("Cart is empty");
        }

        // Calculate total first to avoid the '0' price bug
        let total = 0;
        for (const item of cart.items) {
            total += item.material.price * item.quantity;
        }

        // 2️⃣ Create order with total price
        const order = await this.prisma.order.create({
            data: {
                userId,
                totalPrice: total,
                items: {
                    create: cart.items.map(item => ({
                        materialId: item.materialId,
                        quantity: item.quantity,
                        price: item.material.price,
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // 3️⃣ Clear cart
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        // 4️⃣ Return ready order
        return order;
    }

    async getUserOrders(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        material: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getOrderById(orderId: string) {
        return this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        material: true,
                    },
                },
            },
        });
    }

    async deleteOrder(userId: string, orderId: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new BadRequestException("Order not found");
        }

        if (order.userId !== userId) {
            throw new BadRequestException("Unauthorized to delete this order");
        }

        if (order.paymentStatus === "PAID") {
            throw new BadRequestException("Cannot delete a paid order");
        }

        return this.prisma.$transaction(async (tx) => {
            // Delete order items first
            await tx.orderItem.deleteMany({
                where: { orderId }
            });

            // Delete the order
            await tx.order.delete({
                where: { id: orderId }
            });

            return { message: "Order removed successfully" };
        });
    }

    async updateDeliveryStatus(orderId: string, status: string) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { deliveryStatus: status }
        });
    }

    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        material: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
