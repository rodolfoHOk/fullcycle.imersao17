import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productIds = createOrderDto.items.map((item) => item.product_id);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepository.findBy({
      id: In(uniqueProductIds),
    });
    if (products.length !== uniqueProductIds.length) {
      throw new Error(
        `Algum produto não existe. Produtos passados ${productIds}, produtos encontrados ${products.map((product) => product.id)}`,
      );
    }
    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id === item.product_id,
        );
        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });
    const orderSaved = await this.orderRepository.save(order);
    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
    return orderSaved;
  }

  findAll(client_id: number) {
    return this.orderRepository.find({
      where: { client_id },
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: string, client_id: number) {
    return this.orderRepository.findOneOrFail({
      where: { id, client_id },
      relations: { items: true },
    });
  }

  async pay(id: string) {
    const order = await this.orderRepository.findOneByOrFail({
      id,
    });
    order.pay();
    await this.orderRepository.save(order);
    return order;
  }

  async fail(id: string) {
    const order = await this.orderRepository.findOneByOrFail({
      id,
    });
    order.fail();
    await this.orderRepository.save(order);
    return order;
  }
}
