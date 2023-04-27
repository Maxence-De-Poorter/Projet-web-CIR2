import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';

@Injectable()
export class AnnonceService {

    constructor (@InjectRepository(Annonce) private annonceRepository: Repository<Annonce>) { }

    async getAnnonces(): Promise<Annonce[]> {
        return await this.annonceRepository.find();
    }


}
  