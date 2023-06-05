import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { authMiddleware } from './utils/authMiddleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ItemsController } from './items/items.controller';
// import { ItemsService } from './items/items.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    ItemsModule,
    // UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'attique',
      password: '1234',
      database: 'postgres',
      entities: [Item],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(authMiddleware).forRoutes('items');
  // }
}

//imports: [ItemsModule, UsersModule, MongooseModule.forRoot(config.mongoURI)],
