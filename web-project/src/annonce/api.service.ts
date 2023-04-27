import { Injectable } from '@nestjs/common';
import { HttpService} from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './annonce.entity';

@Injectable()
export class ApiService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Annonce)
    private annonceRepository: Repository<Annonce>,
  ) {}

  @Cron('0 0 */1 * * *') // Toutes les heures
  async callApi() {
    const url = 'https://www.orpi.com/recherche/ajax/rent?locations%5B0%5D%5Bvalue%5D=lille&locations%5B0%5D%5Blabel%5D=Lille+(59000)+-+Ville&sort=date-down&layoutType=mixte&recentlySold=false';
    const response = await this.httpService.get(url).toPromise();
    const annonces = response.data.items;
    const annoncesAvecImages = annonces.map(annonce => ({
        id: annonce.id,
        type: annonce.type,
        price: annonce.price,
        surface: annonce.surface,
        pricePerSquareMeter: annonce.pricePerSquareMeter,
        nbRooms: annonce.nbRooms,
        onMarketSince: annonce.onMarketSince,
        image: annonce.images[0],
      }));

      //Enregistrement des annonces dans la base de données
      //On récupère les annonces déjà présentes dans la base de données pour les comparer avec les nouvelles annonces récupérées de l'API Orpi
        const annoncesBDD = await this.annonceRepository.find();
        //On parcourt les annonces récupérées de l'API Orpi
        annoncesAvecImages.forEach(annonce => {
            //On vérifie si l'annonce est déjà présente dans la base de données
            const annonceBDD = annoncesBDD.find(annonceBDD => annonceBDD.id === annonce.id);
            //Si l'annonce n'est pas présente dans la base de données, on l'ajoute
            if(!annonceBDD){
                this.annonceRepository.save(annonce);
            } 
            });
            console.log("nombre d'annonces", annonces.length)
        console.log("ajout d'annonces", annoncesAvecImages.length)
  }
}
