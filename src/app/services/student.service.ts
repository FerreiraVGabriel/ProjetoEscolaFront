import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { SearchParams } from "../model/search-params.model";
import { FilteredDataParams } from "../model/filtered-data-params.model";
import { StudentOutputDTO } from "../dtos/outputs/student-output.dto";
import { StudentInputDTO } from "../dtos/inputs/student-input.dto";

@Injectable({
    providedIn: 'root'
})
export class StudentService {
  
    constructor(private httpclient: HttpClient) {}
  
    private _refreshrequired = new Subject<void>;
  
    get refreshrequired() {
      return this._refreshrequired;
    }
  
    private readonly baseUrl = environment.apiUrl;
  
  
    GetPagintion(searchParams: SearchParams): Observable<any> {
      let  params = new HttpParams().set('PageNumber', searchParams.CurrentPageNumber)
  
     
      if (searchParams.ItensPerPageNumber) {
        params = params.set('PageSize', searchParams.ItensPerPageNumber);
      }
      
      if (searchParams.SearchTerm) {
        params = params.set('SearchTerm', searchParams.SearchTerm);
      }
  
      return this.httpclient.get<FilteredDataParams<StudentOutputDTO[]>>(`${this.baseUrl}/Student/Pagination`, { params });
    };
  
    Add(studentInputDTO: StudentInputDTO) {
      return this.httpclient.post(
        `${this.baseUrl}/Student/Add`,
        studentInputDTO
      ).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
  
    Update(studentInputDTO: StudentInputDTO) {
      return this.httpclient.put(
        `${this.baseUrl}/Student/Update`,
        studentInputDTO
      ).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
  
    Delete(id: number): Observable<void> {
      return this.httpclient.delete<void>(`${this.baseUrl}/Student/Delete/${id}`).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
    
   
    
}