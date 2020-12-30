# Reservation Livre (en cours)
 
Une API REST réalisée avec NestJS permettant de simuler un système de reservation de livres. La technologie de base de données à utiliser est MongoDB.
Un administrateur peut créer un livre et supprimer un livre.
Un utilisateur non connecté peut voir un livre
Un utilisateur connecté peut reserver un livre ou signaler qu’il a rendu un livre.
Un utilisateur ne peut pas reserver plus de 3 livres.
Un utilisateur est défini par un ID unique.
Un livre est composé d’un id unique et d’un titre.
Une reservation est composée d’un id unique, d’une date de début et d’une date de fin. 

Livre (id, titre)
Reservation (id, date_deb, date_fin)
Administrateur (id, nom, prenom)
Utilisateur (id, nom, prenom)
