export class UserRequestSeletorModel {

    constructor(id: string, name: string, surname: string, createionDate: string) {
      this.name = name;
      this.surname = surname;
      this.id = id;
      this.createionDate = createionDate;
    }
    public id: string;
    public name: string;
    public surname: string;
    public createionDate: string;
  }