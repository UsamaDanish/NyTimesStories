import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwtDecode from "jwt-decode";

import { environment } from "src/environments/environment";
import { CONSTANTS } from "../constants";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AppApiService {
    baseUrl = environment.AUTH_API_BASE_URL;
    intervalId: any;
    timeoutId: any;

    constructor(private http: HttpClient, private authService: AuthService) { }

    login(email: string, password: string) {
        // return this.http.post<any>(`${this.baseUrl}${CONSTANTS.API_URLS.login}`, { email, password })
        //     .pipe(map(token => {
        //         return token;
        //     }));

        this.http.post<any>(`${this.baseUrl}${CONSTANTS.API_URLS.login}`, { email, password }).subscribe({
            next: (res => {
                this.authService.initSession(res.access_token)
                this.registerRefreshTokenAfterDuration()
            })
        });
    }

    signUp(email: string, password: string) {
        this.http.post<any>(`${this.baseUrl}${CONSTANTS.API_URLS.login}`, { email, password }).subscribe({
            next: (res => {
                this.authService.initSession(res.access_token)
                this.registerRefreshTokenAfterDuration()
            })
        })
    }

    registerRefreshTokenAfterDuration() {
       this.intervalId = setInterval(() => {
            this.loginFromExistingToken()
        }, CONSTANTS.REFRESH_TOKEN_TIME * 60 * 1000)
    }

    loginFromExistingToken() {
        try {
            const token = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);

            if (token) {
                const decoded: {
                    exp: number,
                    email: string,
                    password: string
                } = jwtDecode(token);

                this.login(decoded.email, decoded.password)
            }
        } catch (error) {
            console.log(error)
        }
    }

    destroyTimeoutAndInterval() {
        clearInterval(this.intervalId);
    }
}