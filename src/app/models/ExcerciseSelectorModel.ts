export class ExcerciseSelectorModel {

    constructor(id: string, name: string, progress: number) {
      this.name = name;
      this.id = id;
      this.progress = progress;
    }
    public id: string;
    public name: string;
    public progress: number;
  }