import { Etudiant } from './etudiant';
import { Professeur } from './professeur';
import { Groupe } from './groupe';

export interface Cour {
    id:number
    nom:String,
    description:String,
    teacher:Professeur,
    groupe:Groupe,
    presents:Etudiant,
    absents:Etudiant,
    datetime:Date,
    price:Number,
    status:String,
    matiere:String
}
