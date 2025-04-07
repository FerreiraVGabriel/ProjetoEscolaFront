import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { UserOutputDTO } from "../dtos/outputs/user-output.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient){}

    private _refreshrequired = new Subject<void>;

    get refreshrequired() {
      return this._refreshrequired;
    }

    private readonly baseUrl = environment.apiUrl;

    GettAllUsers(){
        return this.httpClient.get<UserOutputDTO[]>(`${this.baseUrl}/User/All`)
            .pipe(
                map(response =>{
                    return response;
                })
            );
    }
}