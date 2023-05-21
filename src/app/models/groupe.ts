import { Etudiant } from './etudiant';
import { Professeur } from './professeur';

export interface Groupe {
    nom:String,
    description:string,
    teacher:Professeur,
    students:Etudiant,
    time:String,
    pricePerLecture:Number,
    niveauScolaire:String,
    creation:Date,
    nbEtudiants:number
}
