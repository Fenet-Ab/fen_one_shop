import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { MaterialModule } from './material/material.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, PrismaModule, ProfileModule, MaterialModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
