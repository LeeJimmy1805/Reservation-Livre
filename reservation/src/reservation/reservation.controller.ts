import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { identity } from 'rxjs';
import { Administrateur } from './entities/administrateur.entities';
import { Livre } from './entities/livre.entities';
import { Reservation } from './entities/reservation.entities';
import { Utilisateur } from './entities/utilisateur.entities';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor (
        private reservationService: ReservationService
    ){}

    // LIVRE
    @Post('/livre/:id') 
    addLivre(
        @Body() newLivre: Livre, 
        @Param('id') id: number
        ){
        console.log("Ajouter un livre");
        return this.reservationService.addLivre(newLivre, id);
    }

    @Get('/livre')
    getAllLivre() {
        console.log("Voir tous les livres");
        return this.reservationService.getAllLivre();
        
    }

    @Delete('/livre/:idLivre/:idAdmin')
    deleteLivre(@Param('idLivre') idLivre: number, @Param('idAdmin') idAdmin: number ) {
        console.log("Supprimer un Livre");
        return this.reservationService.deleteLivre(idLivre, idAdmin);
    }

    // UTILISATEUR
    @Get('/user')
    getAllUser() {
        console.log("Voir tous les utilisateurs");
        return this.reservationService.getAllUser();
    }

    @Post('/user') 
    addUser(
        @Body() newUser: Utilisateur, 
        ){
        console.log("Ajouter un utilisateur");
        return this.reservationService.addUser(newUser);
    }

    @Get('/user/livre/:idLivre/:idUser')
    getLivre(
        @Param('idLivre') idLivre,
        @Param('idUser') idUser
    ){
        console.log("Voir un livre");
        return this.reservationService.getLivre(idLivre, idUser);
    }

    @Post('/:idLivre/:idUser')
    addReservation(
        @Body() newResas: Reservation,
        @Param('idUser') idUser: number,
        @Param('idLivre') idLivre: number
    ){
        console.log("Réserver un livre");
        return this.reservationService.addReservation(newResas, idUser, idLivre);
    }

    //ADMINISTRATEUR
    @Get('/admin')
    getAllAdmin() {
        console.log("Voir tous les administrateurs");
        return this.reservationService.getAllAdmins();
    }

    @Post('/admin') 
    addAdmin(
        @Body() newAdmin: Administrateur, 
        ){
        console.log("Ajouter un administrateur");
        return this.reservationService.addAdmin(newAdmin);
    }
}
