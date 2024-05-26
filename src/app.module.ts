import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DemoEntity } from './entity/demo-data.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
      logging: true,
    }),

    TypeOrmModule.forFeature([
      DemoEntity  
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
