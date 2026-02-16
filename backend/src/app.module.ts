import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { MaterialModule } from './material/material.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [AuthModule, PrismaModule, ProfileModule, MaterialModule, CategoryModule, CartModule, OrderModule, PaymentModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
