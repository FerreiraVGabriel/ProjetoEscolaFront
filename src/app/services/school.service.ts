import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { SearchParams } from "../model/search-params.model";
import { FilteredDataParams } from "../model/filtered-data-params.model";
import { SchoolOutputDTO } from "../dtos/outputs/school-output.dto";
import { SchoolInputDTO } from "../dtos/inputs/school-input.dto";

@Injectable({
    providedIn: 'root'
})
export class SchoolService {
  
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
  
      return this.httpclient.get<FilteredDataParams<SchoolOutputDTO[]>>(`${this.baseUrl}/School/Pagination`, { params });
    };

    GetAll() {
          return this.httpclient.get<SchoolOutputDTO[]>(`${this.baseUrl}/School/All`)
          .pipe(
              map(response => {
              return response;
              })
          );
      }
  
    Add(schoolInputDTO: SchoolInputDTO) {
      return this.httpclient.post(
        `${this.baseUrl}/School/Add`,
        schoolInputDTO
      ).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
  
    Update(schoolInputDTO: SchoolInputDTO) {
      return this.httpclient.put(
        `${this.baseUrl}/School/Update`,
        schoolInputDTO
      ).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
  
    Delete(id: number): Observable<void> {
      return this.httpclient.delete<void>(`${this.baseUrl}/School/Delete/${id}`).pipe(
        tap(() => {
          this.refreshrequired.next();
        })
      );
    }
    
   
    
}