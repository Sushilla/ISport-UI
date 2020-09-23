export class TrainerSelectorModel {

    constructor(id: string, name: string, surname: string, image: string) {
      this.name = name;
      this.surname = surname;
      this.id = id;
      this.image = image;
    }
    public id: string;
    public name: string;
    public surname: string;
    public image: string;
  }