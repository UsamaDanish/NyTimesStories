import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from "src/environments/environment";
import { CONSTANTS } from "../constants";
import { API_URLS } from "../constants/api-urls.constants";

@Injectable({
    providedIn: 'root'
})

export class NewsApiService {
    baseUrl = environment.NEWS_API_BASE_URL;
    apiKey = environment.NEWS_API_KEY;

    constructor(private http: HttpClient) { }

    getStoriesByCategory(category: string) {
        return this.http.get<any>(`${this.baseUrl}${API_URLS.topStoriesByNewsCategory(category, this.apiKey)}`)
    }

    searchArticles(searchText: string, page: number) {
        return this.http.get<any>(`${this.baseUrl}${API_URLS.searchArticles(searchText, this.apiKey)}`);
    }
}