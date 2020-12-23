import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TrainerListForAdding } from '../models/TrainerListForAdding';
import { RequestToAddTrainerKvietimas } from '../models/RequestToAddTrainerKvietimas';

@Injectable()
export class BackEndService {

    constructor(private http: HttpClient) {
    }

    public getTrainerListForAddingTrainer(): Observable<TrainerListForAdding[]> {
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<TrainerListForAdding[]>("http://localhost:5000/api/v1/models/vartotojasTreneris", requestOptions);
    }

    public putKvietimasTreneriIDraugus(body: RequestToAddTrainerKvietimas): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put("http://localhost:5000/api/v1/models/kvietimai", body, requestOptions);
    }
}
