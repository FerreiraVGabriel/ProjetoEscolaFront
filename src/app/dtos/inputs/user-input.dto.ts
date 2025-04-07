export class UserInputDTO {
    public SNome: string;
    public SSenha: string;
  
    constructor(SNome: string, SSenha: string) {
      this.SNome = SNome;
      this.SSenha = SSenha;
    }
}