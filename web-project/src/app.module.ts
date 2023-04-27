import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnonceController } from './annonce/annonce.controller';
import { AnnonceModule } from './annonce/annonce.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AnnonceModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "ProjetWebCIR2",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": false
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  