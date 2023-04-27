import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiService } from './api.service';
import { Annonce} from './annonce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnonceController } from './annonce.controller';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), TypeOrmModule.forFeature([Annonce])],
  providers: [AnnonceService, ApiService],
  controllers: [AnnonceController]
})
export class AnnonceModule {}
