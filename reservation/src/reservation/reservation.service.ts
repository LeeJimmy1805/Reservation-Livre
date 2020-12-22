import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Administrateur } from './entities/administrateur.entities';
import { Livre } from './entities/livre.entities';
import { Reservation } from './entities/reservation.entities';
import { Utilisateur } from './entities/utilisateur.entities';

@Injectable()
export class ReservationService {
    livres: Livre[] = [];
    users: Utilisateur[] = [];
    admins: Administrateur[] = [];
    resas: Reservation[] = [];

    addLivre(newLivre: Livre, id: number) {
        if (this.livres.length){
            newLivre.id = this.livres[this.livres.length-1].id + 1;
        } else {
            newLivre.id = 1;
        }
        
        const admin = this.admins.find(actualAdmins => actualAdmins.id === +id);

        if (!admin) 
            throw new NotFoundException(`L'administrateur d'id ${id} n'hésite pas`);

        if (admin.role != "Admin")
            throw new NotAcceptableException("Création du Livre impossible, vous n'avez pas les droits");

        this.livres.push(newLivre);
        return newLivre;
    }

    deleteLivre(idLivre: number, idAdmin: number) {
        const indexLivre = this.livres.findIndex(livre=>livre.id === +idLivre);
        const admin = this.admins.find(actualAdmins => actualAdmins.id === +idAdmin);
        
        if (!admin) 
            throw new NotFoundException(`L'administrateur d'id ${idAdmin} n'hésite pas`);
        
        if (admin.role != "Admin")
            throw new NotAcceptableException("Création du Livre impossible, vous n'avez pas les droits");

        if (indexLivre >= 0) {
            this.livres.splice(indexLivre, 1);
        } else {
            throw new NotFoundException (`Le livre d'id ${idLivre} n'hésite pas`);
        }

        return {
            "message": `Le livre d'id ${idLivre} à été supprimé`
        }
    }

    getAllLivre() {
        return this.livres;
    }

    getLivre(idLivre: number, idUser: number) {
        const livre = this.livres.find(livre => livre.id === +idLivre );
        const user = this.users.find(user => user.id === +idUser);

        if (!livre)
            throw new NotFoundException (`Le livre d'id ${idLivre} n'hésite pas`);
        
        if (!user)
            throw new NotFoundException (`L'utilisateur d'id ${idLivre} n'hésite pas`);

        if (user.role == "User")
            return livre;
    }

    addReservation(newResas: Reservation, idUser: number, idLivre: number) {
        const user = this.users.find(user => user.id === +idUser);
        const livre = this.livres.find(livre => livre.id === +idLivre );
        
        if (!livre)
            throw new NotFoundException (`Le livre d'id ${idLivre} n'hésite pas`);

        if (this.resas.length){
            newResas.id = this.resas[this.resas.length-1].id + 1;
        } else {
            newResas.id = 1;
        }

        if (!user)
            throw new NotFoundException (`L'utilisateur d'id ${idUser} n'hésite pas`);

        if (!user.connected) {
            throw new NotFoundException (`L'utilisateur d'id ${idUser} n'est pas connecter, impossible de réserver`);
        }

        newResas.idUser = idUser;
        newResas.date_deb = new Date();
        newResas.date_fin = new Date();

        this.resas.push(newResas);
        return newResas;
    }

    getAllReservation() {
        return this.resas;
    }

    addUser(newUser: Utilisateur) {
        if (this.users.length){
            newUser.id = this.users[this.users.length-1].id + 1;
        } else {
            newUser.id = 1;
        }

        this.users.push(newUser);
        return newUser;
    }

    getAllUser() {
        return this.users;
    }

    addAdmin(newAdmin: Administrateur) {
        if (this.admins.length){
            newAdmin.id = this.admins[this.admins.length-1].id + 1;
        } else {
            newAdmin.id = 1;
        }

        this.admins.push(newAdmin);
        return newAdmin;
    }

    getAllAdmins() {
        return this.admins;
    }
}
