export class CreateTreniruote{
    public trenerioId: string;
    public vartotojoId: string;
    public pavadinimas: string;
    public aprasymas: string;
    public vartId: string[];
    public prat: exerciseList[];
}

export class exerciseList{
    public id: string;
    public priej: number;
    public skaic: number;
}
