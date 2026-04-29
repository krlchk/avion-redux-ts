import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OrderStatus, Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//FUTURE
// import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  getMyOrders(
    @CurrentUser() user: UserEntity,
    @Query('status') status?: OrderStatus,
  ) {
    return this.ordersService.getMyOrders(user.id, status);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    return this.ordersService.findAll(status);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(
    @Param('id', ParseUUIDPipe) orderId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ordersService.getById(orderId, user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/:id')
  getByIdForAdmin(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getByIdForAdmin(orderId);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post()
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: UserEntity) {
    return this.ordersService.create(dto, user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/cancel')
  cancelOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.cancelOrder(orderId);
  }

  //FUTURE

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.ADMIN)
  // @Patch(':id/status')
  // updateStatus(
  //   @Param('id', ParseUUIDPipe) orderId: string,
  //   @Body() dto: UpdateOrderStatusDto,
  // ) {
  //   return this.ordersService.updateStatus(orderId, dto.status);
  // }
}
