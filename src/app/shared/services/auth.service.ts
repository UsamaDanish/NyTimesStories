import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { AppApiService } from "./app-api.service";
import { CONSTANTS } from "../constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router) { }

    initSession(token: string) {
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, token);

        this.router.navigate(['stories']);
    }

    isLoggedIn() {
        try {
            const token = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);

            if (token) {
                const decoded: {
                    exp: number
                } = jwtDecode(token);

                if (decoded && Date.now() <= decoded.exp * 1000) {
                    return true
                }
                this.router.navigate(['/']);

                return false;
            } else {
                this.router.navigate(['/']);

                return false;
            }
        } catch (error) {
            this.router.navigate(['/']);

            return false
        }

    }

    getToken() {
        return localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
    }


}