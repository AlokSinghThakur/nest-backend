import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/schemas/user.model';

@Module({
  // imports: [UsersModule, TransactionsModule],
  imports: [UsersModule, TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nest_backend',
      entities: [User],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers:[AppService]
  
})
export class AppModule {}
