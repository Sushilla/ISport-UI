import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TrainerListForAdding } from '../models/TrainerListForAdding';
import { RequestToAddTrainerKvietimas } from '../models/RequestToAddTrainerKvietimas';
import {KvietimaiToTrainer} from '../models/KvietimaiToTrainer'

@Injectable()
export class BackEndService {

    private requestNumberSource  = new BehaviorSubject(0);
    currentRequestNumber  = this.requestNumberSource.asObservable();

    constructor(private http: HttpClient) {
    }

    changeRequestNumber(message: number) {
        console.log(message);
        
        this.requestNumberSource.next(message)
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

    public getKvietimaiToTrainer(id: string): Observable<KvietimaiToTrainer[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<KvietimaiToTrainer[]>("http://localhost:5000/api/v1/models/kvietimai/" + id, requestOptions);
    }

    public deleteTrainerRequest(id: string): Observable<any>{
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.delete("http://localhost:5000/api/v1/models/kvietimai/"+id, requestOptions);
    }

    public acceptTrainerRequest(){
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
    }

    public getNumberOfRequestsToTrainer(id: string): Observable<any>{
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<any>("http://localhost:5000/api/v1/models/kvietimaiSkaicius/"+id, requestOptions);
    }
}
