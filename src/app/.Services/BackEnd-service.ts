import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { TrainerListForAdding } from '../models/TrainerListForAdding';
import { RequestToAddTrainerKvietimas } from '../models/RequestToAddTrainerKvietimas';
import { KvietimaiToTrainer } from '../models/KvietimaiToTrainer'
import { AcceptedTrainersList } from '../models/AcceptedTrainersList';
import { PakeistiRoleListForAdmin } from '../models/PakeistiRoleListForAdmin'
import { StoreLogedInUserDataToCookie } from '../models/StoreLogedInUserDataToCookie';
import { CreateTreniruote } from '../models/CreateTreniruote';
import { TreniruoteTreneris } from '../models/TreniruoteTreneris';

@Injectable()
export class BackEndService {

    private requestNumberSource = new BehaviorSubject(0);
    currentRequestNumber = this.requestNumberSource.asObservable();

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

    public deleteTrainerRequest(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.delete("http://localhost:5000/api/v1/models/kvietimai/" + id, requestOptions);
    }

    public acceptTrainerRequest(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put("http://localhost:5000/api/v1/models/pakviestiTreneriaiAcceptReuqest/" + id, requestOptions);
    }

    public getNumberOfRequestsToTrainer(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<any>("http://localhost:5000/api/v1/models/kvietimaiSkaicius/" + id, requestOptions);
    }

    public getTrainerWhoAcceptedMyInvite(id: string): Observable<AcceptedTrainersList> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<AcceptedTrainersList>("http://localhost:5000/api/v1/models/pakviestiTreneriai/" + id, requestOptions);
    }

    public loginUser(email: string, pass: string): Observable<StoreLogedInUserDataToCookie> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<StoreLogedInUserDataToCookie>("http://localhost:5000/api/v1/models/vartotojasLogin/" + email + "/" + pass, requestOptions);
    }

    public getListForChangingRole(): Observable<PakeistiRoleListForAdmin[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<PakeistiRoleListForAdmin[]>("http://localhost:5000/api/v1/models/PrasymaiPakeistRole", requestOptions);
    }
    
    public sendrequestToAdminForChangingRole(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put<any>("http://localhost:5000/api/v1/models/PrasymaiPakeistRole/" + id, requestOptions);
    }

    public adminRejectUserFromBecomingTrainer(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.delete("http://localhost:5000/api/v1/models/PrasymaiPakeistRole/" + id, requestOptions);
    }

    public adminApproveUserToBecomeTrainer(id: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put("http://localhost:5000/api/v1/models/ApprovePakeistRole/" + id, requestOptions);
    }

    public createTreinuorte(treniruoteAP: CreateTreniruote): Observable<any>{
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put("http://localhost:5000/api/v1/models/treniruote", JSON.stringify(treniruoteAP), requestOptions);
    }

    public getTrainerCreatedExercises(id: string): Observable<TreniruoteTreneris[]>{
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<TreniruoteTreneris[]>("http://localhost:5000/api/v1/models/treniruote/"+id, requestOptions);
    }

}
