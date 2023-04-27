import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Annonce{

    @PrimaryColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    price: number;

    @Column()
    surface: number;

    @Column({nullable: true})
    pricePerSquareMeter: number;

    @Column()
    nbRooms: number;

    @Column()
    onMarketSince: string;

    @Column()
    image: string;
}