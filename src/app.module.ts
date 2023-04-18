import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/schemas/user.model';

@Module({
  // imports: [UsersModule, TransactionsModule],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '54321',
      database: 'localhost',
      models: [User],
    }),UsersModule, TransactionsModule,
  ],
  controllers: [AppController],
  
})
export class AppModule {}
