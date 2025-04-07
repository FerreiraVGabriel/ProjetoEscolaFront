import { StudentOutputDTO } from "./student-output.dto";

export class SchoolOutputDTO {
  public ICodEscola: number;
  public SDescricao: string;
  public StudentOutputDTO: StudentOutputDTO[];

  constructor(ICodEscola: number, SDescricao: string, StudentOutputDTO: StudentOutputDTO[]) {
    this.SDescricao = SDescricao;
    this.ICodEscola = ICodEscola;
    this.StudentOutputDTO = StudentOutputDTO;
  }
}