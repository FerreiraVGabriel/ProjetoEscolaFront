export class StudentInputDTO {
    public ICodAluno: number;
    public SNome: string;
    public DNascimento: string;
    public SCPF: string;
    public SEndereco: string;
    public SCelular: string;
    public ICodEscola: number;
  
    constructor(
      ICodAluno: number,
      SNome: string,
      DNascimento: string,
      SCPF: string,
      SEndereco: string,
      SCelular: string,
      ICodEscola: number
    ) {
      this.ICodAluno = ICodAluno;
      this.SNome = SNome;
      this.DNascimento = DNascimento;
      this.SCPF = SCPF;
      this.SEndereco = SEndereco;
      this.SCelular = SCelular;
      this.ICodEscola = ICodEscola;
    }
  }
  