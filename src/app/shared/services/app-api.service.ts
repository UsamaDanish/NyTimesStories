import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from "src/environments/environment";
import { CONSTANTS } from "../constants";

@Injectable({
    providedIn: 'root'
})

export class AppApiService {
    baseUrl = environment.AUTH_API_BASE_URL;

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.baseUrl}${CONSTANTS.API_URLS.login}`, { email, password })
            .pipe(map(token => {
                return token;
            }));
    }

    signUp(email: string, password: string) {
        return this.http.post<any>(`${this.baseUrl}${CONSTANTS.API_URLS.signUp}`, { email, password })
            .pipe(map(token => {
                return token;
            }));
    }
}