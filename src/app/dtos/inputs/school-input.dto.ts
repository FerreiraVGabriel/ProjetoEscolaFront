export class SchoolInputDTO {
    public ICodEscola: number;
    public SDescricao?: string;
  
    constructor(ICodEscola: number, SDescricao: string) {
      this.SDescricao = SDescricao;
      this.ICodEscola = ICodEscola;
    }
}