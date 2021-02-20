export class WorkoutEditData{
    public treniruotesId:string;
    public pavadinimas:string;
    public aprasymas:string;
    public treniruotesPratymai: treniPrat[];
    public pratIds: string[];
    public usersIds: string[];
}

export class treniPrat{
    public treniruotesId: string;
    public pratymoId: string;
    public priejimai: number;
    public skaicius: number;
    public pavadinimas: string;
}
