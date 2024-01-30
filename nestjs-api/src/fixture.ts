import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepository = dataSource.getRepository('Product');
  await productRepository.insert([
    {
      id: '2be82129-cf3b-46ab-bd2c-acf7cb13917d',
      name: 'Product 1',
      description: 'Description product 1',
      price: 100,
      image_url: 'http://localhost:9000/products/1.png',
    },
    {
      id: '5a925810-1ab2-4bab-a4c1-d8e0419c1e7f',
      name: 'Product 2',
      description: 'Description product 2',
      price: 200,
      image_url: 'http://localhost:9000/products/2.png',
    },
    {
      id: '10c83bae-cf4b-4564-b38a-5c15a4d6f0da',
      name: 'Product 3',
      description: 'Description product 3',
      price: 230,
      image_url: 'http://localhost:9000/products/3.png',
    },
    {
      id: 'f435d8e7-84db-4f1b-92a7-e88e7351e497',
      name: 'Product 4',
      description: 'Description product 4',
      price: 150,
      image_url: 'http://localhost:9000/products/4.png',
    },
    {
      id: '6f13d8cd-8a6e-4084-97db-e6c2c635f0c8',
      name: 'Product 5',
      description: 'Description product 5',
      price: 180,
      image_url: 'http://localhost:9000/products/5.png',
    },
    {
      id: 'ca9b23c3-2b08-42db-99ac-cf9d8b7a6f9e',
      name: 'Product 6',
      description: 'Description product 6',
      price: 120,
      image_url: 'http://localhost:9000/products/6.png',
    },
    {
      id: 'a9f14e9d-4e7a-4e87-8913-1bcf2ef79c4d',
      name: 'Product 7',
      description: 'Description product 7',
      price: 250,
      image_url: 'http://localhost:9000/products/7.png',
    },
    {
      id: 'ed23a755-717c-4f8d-90b0-3f44b9a7c816',
      name: 'Product 8',
      description: 'Description product 8',
      price: 90,
      image_url: 'http://localhost:9000/products/8.png',
    },
    {
      id: '9ff96e62-9f38-4341-bba6-3e4b3562ad9c',
      name: 'Product 9',
      description: 'Description product 9',
      price: 170,
      image_url: 'http://localhost:9000/products/9.png',
    },
    {
      id: '4b59fc2d-3e9f-4aae-8237-b1efc717f3b8',
      name: 'Product 10',
      description: 'Description product 10',
      price: 130,
      image_url: 'http://localhost:9000/products/10.png',
    },
    {
      id: 'c5c7115f-795c-4a9c-8aeb-57d0eef9f6e7',
      name: 'Product 11',
      description: 'Description product 11',
      price: 190,
      image_url: 'http://localhost:9000/products/11.png',
    },
    {
      id: 'b3b6b6ab-811d-4a8d-b453-2c3c3bbabf58',
      name: 'Product 12',
      description: 'Description product 12',
      price: 110,
      image_url: 'http://localhost:9000/products/12.png',
    },
    {
      id: 'a6b35c01-af32-40e1-9602-4871d0d1f862',
      name: 'Product 13',
      description: 'Description product 13',
      price: 200,
      image_url: 'http://localhost:9000/products/13.png',
    },
    {
      id: 'e2b0e34f-1862-4f1a-b05d-745779f6cbea',
      name: 'Product 14',
      description: 'Description product 14',
      price: 140,
      image_url: 'http://localhost:9000/products/14.png',
    },
    {
      id: '80a798bf-cdf9-4eb9-b711-5e0a1a91db5e',
      name: 'Product 15',
      description: 'Description product 15',
      price: 160,
      image_url: 'http://localhost:9000/products/15.png',
    },
    {
      id: 'f2ed5ba3-df7f-4d6b-92d4-87e540c9a90d',
      name: 'Product 16',
      description: 'Description product 16',
      price: 220,
      image_url: 'http://localhost:9000/products/16.png',
    },
    {
      id: 'e55400c2-4bfc-4cf9-9ce5-4787a27c5711',
      name: 'Product 17',
      description: 'Description product 17',
      price: 120,
      image_url: 'http://localhost:9000/products/17.png',
    },
    {
      id: '17aa763e-0efb-4462-bb0f-d1d3d86d7a06',
      name: 'Product 18',
      description: 'Description product 18',
      price: 180,
      image_url: 'http://localhost:9000/products/18.png',
    },
    {
      id: 'b98c0f4d-451c-4b37-bc5a-2c44ff823d31',
      name: 'Product 19',
      description: 'Description product 19',
      price: 90,
      image_url: 'http://localhost:9000/products/19.png',
    },
    {
      id: '5b1f0513-06b5-439b-909b-e1bb46d03e1b',
      name: 'Product 20',
      description: 'Description product 20',
      price: 200,
      image_url: 'http://localhost:9000/products/20.png',
    },
  ]);

  await app.close();
}
bootstrap();
