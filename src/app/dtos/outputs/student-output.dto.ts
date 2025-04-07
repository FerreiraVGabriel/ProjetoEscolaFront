export class StudentOutputDTO {
    public SNome: string;
    public DNascimento: Date;
    public SCPF: string;
    public SEndereco: string;
    public SCelular: string;
    public ICodEscola: number;
    public EscolaDescricao: string;
  
    constructor(
      SNome: string,
      DNascimento: Date,
      SCPF: string,
      SEndereco: string,
      SCelular: string,
      ICodEscola: number,
      EscolaDescricao: string,
    ) {
      this.SNome = SNome;
      this.DNascimento = DNascimento;
      this.SCPF = SCPF;
      this.SEndereco = SEndereco;
      this.SCelular = SCelular;
      this.ICodEscola = ICodEscola;
      this.EscolaDescricao = EscolaDescricao
    }
  }
  