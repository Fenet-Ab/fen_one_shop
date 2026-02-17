import { Controller, Get, Param, Post, Req, UseGuards, Delete, Patch, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    @Post("checkout")
    @UseGuards(JwtGuard)
    checkout(@Req() req) {
        return this.orderService.createOrderFromCart(
            req.user.userId,
        );
    }

    @Get("all")
    @UseGuards(JwtGuard)
    getAll(@Req() req) {
        return this.orderService.getUserOrders(req.user.userId);
    }

    // Admin Endpoints
    @Get("admin/all")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    adminGetAll() {
        return this.orderService.getAllOrders();
    }

    @Get("admin/market-share")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    getMarketShare() {
        return this.orderService.getMarketShare();
    }

    @Get(":id")
    @UseGuards(JwtGuard)
    getOne(@Param("id") id: string) {
        return this.orderService.getOrderById(id);
    }

    @Delete(":id")
    @UseGuards(JwtGuard)
    delete(@Param("id") id: string, @Req() req) {
        return this.orderService.deleteOrder(req.user.userId, id);
    }



    @Patch("delivery/:id")
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    updateStatus(@Param("id") id: string, @Body("status") status: string) {
        return this.orderService.updateDeliveryStatus(id, status);
    }

}
