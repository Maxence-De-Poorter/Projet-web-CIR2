import { Controller, Get } from '@nestjs/common';
import { AnnonceService } from './annonce.service';

@Controller('annonce')
export class AnnonceController {

    constructor(private annonceService: AnnonceService) {  }

    @Get()
    async getAnnonces() {
        return await this.annonceService.getAnnonces();
    }
    
}