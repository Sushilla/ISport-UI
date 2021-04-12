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
import { Pratymai } from '../models/Pratymai';
import { TrainerUsers } from '../models/TrainerUsers'
import { CreateWorkoutUserList } from '../models/CreateWorkoutUserList';
import { WorkoutEditData } from "../models/Workout/WorkoutEditData";
import { UsersAddedToWorkout } from "../models/UsersAddedToWorkout";
import { registerData } from "../models/registerData"
import { UserGeneralStat, UserGeneralStat2 } from "../models/Statistics/UserGeneralStat";



@Injectable()
export class BackEndService {

    private requestNumberSource = new BehaviorSubject(0);
    currentRequestNumber = this.requestNumberSource.asObservable();

    constructor(private http: HttpClient) {
    }

    changeRequestNumber(message: number) {
        // console.log(message);

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

    public registerUser(regData: registerData): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put<any>("http://localhost:5000/api/v1/models/vartotojas/", JSON.stringify(regData), requestOptions)
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

    public getTrainerCreatedExercises(id: string): Observable<TreniruoteTreneris[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<TreniruoteTreneris[]>("http://localhost:5000/api/v1/models/treniruote/" + id, requestOptions);
    }

    public getAllExerciseList(): Observable<Pratymai[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<Pratymai[]>("http://localhost:5000/api/v1/models/pratymai", requestOptions);
    }

    public getAllTrainersUsers(id: string): Observable<TrainerUsers[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<TrainerUsers[]>("http://localhost:5000/api/v1/models/pakviestiTreneriaiUsers/" + id, requestOptions);
    }

    //workout

    public createTreinuorte(treniruoteAP: CreateTreniruote): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.put("http://localhost:5000/api/v1/models/treniruote", JSON.stringify(treniruoteAP), requestOptions);
    }

    public getEditDataForWorkout(id: string): Observable<WorkoutEditData> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<WorkoutEditData>('http://localhost:5000/api/v1/models/treniruoteEditData/' + id, requestOptions);
    }

    public updateWorkout(updateQuery: WorkoutEditData): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.post<any>('http://localhost:5000/api/v1/models/treniruote', JSON.stringify(updateQuery), requestOptions);
    }

    public deleteWorkout(id: string): Observable<any> { //dar reik padeletin ir atliktas treniruotes
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.delete('http://localhost:5000/api/v1/models/treniruote/' + id, requestOptions);
    }

    public getSelectedWorkoutUsers(id: string): Observable<UsersAddedToWorkout[]> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<UsersAddedToWorkout[]>('http://localhost:5000/api/v1/models/vartotojaiWorkout/' + id, requestOptions);
    }
    //

    public getUserWorkouts(tid: string, uid: string): Observable<any> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<any[]>('http://localhost:5000/api/v1/models/userTreniruotes/' + tid + '/' + uid, requestOptions);
    }

    public getUserGeneralStatistic(uid: string): Observable<UserGeneralStat> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<UserGeneralStat>('http://localhost:5000/api/v1/models/statistika/' + uid, requestOptions);
    }

    public getUserStatisticForTrainer(uid: string, wid: string): Observable<UserGeneralStat2> {
        const header = {
            'Content-Type': 'application/json'
        }
        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return this.http.get<UserGeneralStat2>('http://localhost:5000/api/v1/models/statistikafortrainer/' + uid + '/' + wid, requestOptions);
    }


}
