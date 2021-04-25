import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BackEndService } from 'src/app/.Services/BackEnd-service';
import { exerciseList } from 'src/app/models/CreateTreniruote';
import { Pratymai } from 'src/app/models/Pratymai';
import { treniPrat, WorkoutEditData } from '../../models/Workout/WorkoutEditData';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UIService } from 'src/app/.Services/UIService';
import { TrainerUsers } from 'src/app/models/TrainerUsers';
import { SnackBarService } from 'src/app/.Services/SnackBarService';

@Component({
    selector: 'editWorkout-dialog',
    templateUrl: 'editWorkout.html',
})
export class EditWorkout {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    editData = new WorkoutEditData();
    isLoaded: boolean = false;
    loadedUserList: boolean = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    removable = true;
    selectable = true;

    exerciseCtrl = new FormControl();
    filteredExercise: Observable<string[]>;
    exercisesListas: string[] = [];
    exerciseList: Pratymai[] = new Array<Pratymai>();
    selectedExerciseList: exerciseList[] = new Array<exerciseList>();

    @ViewChild('exerciseInput') exerciseInput: ElementRef<HTMLInputElement>;
    @ViewChild('autoExercise') matAutocompleteExercise: MatAutocomplete;


    fruitCtrl = new FormControl();

    filteredUsers: Observable<string[]>;
    usersList: string[] = [];
    userListFromBack: TrainerUsers[] = new Array<TrainerUsers>();

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(private _formBuilder: FormBuilder, private backendService: BackEndService, @Inject(MAT_DIALOG_DATA) public data: any, private uiService: UIService, private snackService: SnackBarService) {
        this.snackService.callWarningSnackBar('Please, don\'t close the window, otherwise changes won\'t be saved');
        this.getData();
    }

    ngOnInit() {
        // this.firstFormGroup = this._formBuilder.group({
        //     titleCtrl: ['', Validators.required],
        //     descCtrl: ['', Validators.required]
        // });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ''
        });
    }

    getData() {
        this.backendService.getEditDataForWorkout(this.data.id).subscribe(result => {
            this.editData = result;
            // console.log(result);
            this.isLoaded = true;
        }, error => {
            console.log(error);

        }, () => {
            this.getExerciseList();
        })
    }

    getUserList() {
        this.backendService.getAllTrainersUsers(this.uiService.getUserIdFromCookie()).subscribe(result => {
            this.userListFromBack = result;
            result.forEach(res => {
                let ifNotExist: boolean = true;
                this.editData[0].usersIds.forEach(element => {
                    if (element == res.id)
                        ifNotExist = false;
                });
                if (ifNotExist)
                    this.usersList.push(res.email);
            })
            this.loadedUserList = true;
        }, error => {
            console.log(error);

        }, () => {
            this.loadUsers();
        })
    }

    getExerciseList() {
        this.backendService.getAllExerciseList().subscribe(result => {
            this.exerciseList = result;
            result.forEach(res => {
                let ifNotExist: boolean = true;
                this.editData[0].treniruotesPratymai.forEach(element => {
                    if (element.pavadinimas == res.pavadinimas)
                        ifNotExist = false;
                });
                if (ifNotExist)
                    this.exercisesListas.push(res.pavadinimas);
            })

            // console.log(this.exercisesListas);
        }, error => {
            console.log(error);

        }, () => {
            this.loadExexrcise();
            this.getUserList();
        })
    }


    loadExexrcise() {
        this.filteredExercise = this.exerciseCtrl.valueChanges.pipe(
            startWith(null),
            map((exercises: string | null) => exercises ? this._filterExercise(exercises) : this.exercisesListas.slice()));
    }

    loadUsers() {
        this.filteredUsers = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((users: string | null) => users ? this._filterUSers(users) : this.usersList.slice()));
    }

    private _filterExercise(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.exercisesListas.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterUSers(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.usersList.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    removeExercise(pratId: string): void {
        let searchForValues = this.editData[0].treniruotesPratymai.find(c => c.pratymoId == pratId);
        const index = this.editData[0].treniruotesPratymai.indexOf(searchForValues);
        if (index >= 0) {
            this.exercisesListas.push(searchForValues.pavadinimas);
            this.editData[0].treniruotesPratymai.splice(index, 1);
            this.loadExexrcise();
        }
    }

    removeUser(id: string): void {
        const index = this.editData[0].usersIds.indexOf(id);
        if (index >= 0) {
            this.editData[0].usersIds.splice(index, 1);
            let userEmail = this.userListFromBack.find(a => a.id == id).email;
            this.usersList.push(userEmail);
            this.loadUsers();
        }
    }

    addExercise(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        this.exercisesListas.forEach(rez => {
            if (rez == value) {
                this.exercisesListas.splice(this.exercisesListas.indexOf(value), 1);
                let exercise = new treniPrat();
                exercise.treniruotesId = this.editData[0].treniruotesId;
                exercise.pratymoId = this.exerciseList.find(c => c.pavadinimas == value).pratimoId;
                exercise.priejimai = 1;
                exercise.skaicius = 1;
                exercise.pavadinimas = value;
                this.editData[0].treniruotesPratymai.push(exercise);
                if ((value || '').trim()) {
                    // this.exercises.push(value.trim());
                }
            }
        })
        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.exerciseCtrl.setValue(null);
    }

    addUser(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        this.usersList.forEach(rez => {
            if (rez == value) {
                this.usersList.splice(this.usersList.indexOf(value), 1)
                this.editData[0].usersIds.push(this.userListFromBack.find(a => a.email == value).id);

                if ((value || '').trim()) {
                    // this.users.push(value.trim());
                }
            }
        })
        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    selectedExercise(event: MatAutocompleteSelectedEvent): void {
        let exercise = new treniPrat();
        exercise.treniruotesId = this.editData[0].treniruotesId;
        exercise.pratymoId = this.exerciseList.find(c => c.pavadinimas == event.option.viewValue).pratimoId;
        exercise.priejimai = 1;
        exercise.skaicius = 1;
        exercise.pavadinimas = event.option.viewValue;
        this.editData[0].treniruotesPratymai.push(exercise);
        this.exercisesListas.splice(this.exercisesListas.indexOf(event.option.viewValue), 1)
        this.exerciseInput.nativeElement.value = '';
        this.exerciseCtrl.setValue(null);
        this.loadExexrcise();
    }

    selectedUser(event: MatAutocompleteSelectedEvent): void {
        let selectedUserData = this.userListFromBack.find(c => c.email == event.option.viewValue).id;
        this.editData[0].usersIds.push(selectedUserData);
        this.usersList.splice(this.usersList.indexOf(event.option.viewValue), 1)
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    idToUserEmail(id: any) {        
        return this.userListFromBack.find(a => a.id == id).email;
    }

    sendRequest(){
        this.backendService.updateWorkout(this.editData[0]).subscribe(result=>{
            this.snackService.callSuccessSnackBar('Workout updated successfully');
        }, error=>{
            this.snackService.callErrorSnackBar('Something went wrong');            
        })
    }
}