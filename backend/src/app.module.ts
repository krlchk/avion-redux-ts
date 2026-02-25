import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
// import { LoggerMiddleware } from './conception/middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    FilesModule,
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('products');
//   }
// }
