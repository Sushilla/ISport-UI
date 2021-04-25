import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { BackEndService } from 'src/app/.Services/BackEnd-service';
import { CreateTreniruote, exerciseList } from 'src/app/models/CreateTreniruote';
import { UIService } from 'src/app/.Services/UIService';
import { Pratymai } from 'src/app/models/Pratymai';
import { TrainerUsers } from 'src/app/models/TrainerUsers';
import { CreateWorkoutUserList } from 'src/app/models/CreateWorkoutUserList';
import { SnackBarService } from 'src/app/.Services/SnackBarService';


@Component({
    selector: 'createNewWorkout-dialog',
    templateUrl: 'createNewWorkout.html',
})
export class CreateNewWorkout {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    treniruotesInfo = new CreateTreniruote();

    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    fruitCtrl = new FormControl();
    filteredUsers: Observable<string[]>;
    users: string[] = [];
    usersIDs: string[] = [];
    usersList: string[] = [];
    userListFromBack: TrainerUsers[] = new Array<TrainerUsers>();
    sendlistOfUsers: CreateWorkoutUserList[] = new Array<CreateWorkoutUserList>();

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    
    exerciseCtrl = new FormControl();
    filteredExercise: Observable<string[]>;
    exercises: string[] = [];
    exercisesListas: string[] = [];
    exerciseList: Pratymai[] = new Array<Pratymai>();
    selectedExerciseList: exerciseList[] = new Array<exerciseList>();


    @ViewChild('exerciseInput') exerciseInput: ElementRef<HTMLInputElement>;
    @ViewChild('autoExercise') matAutocompleteExercise: MatAutocomplete;


    constructor(private _formBuilder: FormBuilder, private backendServide: BackEndService, private uiService: UIService, private snackService: SnackBarService) {
        this.snackService.callWarningSnackBar('Please, don\'t close the window, otherwise changes won\'t be saved');
        this.getExerciseList();
        this.getUserList();
    }


    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            titleCtrl: ['', Validators.required],
            descCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ''
        });
    }

    getExerciseList() {
        this.backendServide.getAllExerciseList().subscribe(result => {
            this.exerciseList = result;
            
            result.forEach(res=>{
                this.exercisesListas.push(res.pavadinimas);        
            })
        }, error => {
            console.log(error);

        }, ()=>{
            this.loadExexrcise();
        })
    }

    getUserList(){
        this.backendServide.getAllTrainersUsers(this.uiService.getUserIdFromCookie()).subscribe(result=>{
            this.userListFromBack = result;
            result.forEach(res=>{
                this.usersList.push(res.email);                              
            })
        }, error=>{
            console.log(error);
            
        }, ()=>{
            this.loadUsers();
        })
    }



    addUser(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        this.usersList.forEach(rez => {
            if (rez == value) {                
                this.usersList.splice(this.usersList.indexOf(value), 1)
                // Add our fruit
                if ((value || '').trim()) {
                    this.users.push(value.trim());
                }
            }
        })
        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    addExercise(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        this.exercisesListas.forEach(rez => {            
            if (rez == value) {
                this.exercisesListas.splice(this.exercisesListas.indexOf(value), 1)
                // Add our fruit
                if ((value || '').trim()) {                    
                    this.exercises.push(value.trim());
                }
            }
        })
        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.exerciseCtrl.setValue(null);
    }

    removeUser(email: string): void {
        const index = this.users.indexOf(email);
        if (index >= 0) {
            let selectedUserData = this.userListFromBack.find(c=> c.email == email).id;
            this.usersIDs.splice(this.usersIDs.indexOf(selectedUserData), 1);
            console.log(this.usersIDs);
            this.users.splice(index, 1);
            this.usersList.push(email);
            this.loadUsers();
        }
    }

    removeExercise(name: string): void {
        const index = this.exercises.indexOf(name);
        if (index >= 0) {
            let selectedExercise = this.exerciseList.find(c=> c.pavadinimas == name).pratimoId;
            let indexOfselectedExercise = this.selectedExerciseList.find(c=> c.id == selectedExercise)
            this.selectedExerciseList.splice(this.selectedExerciseList.indexOf(indexOfselectedExercise) ,1);
            this.exercises.splice(index, 1);
            this.exercisesListas.push(name);
            this.loadExexrcise();
        }
    }

    selectedUser(event: MatAutocompleteSelectedEvent): void {       
        let selectedUserData = this.userListFromBack.find(c=> c.email == event.option.viewValue).id;
        this.usersIDs.push(selectedUserData);      
        this.users.push(event.option.viewValue);
        this.usersList.splice(this.usersList.indexOf(event.option.viewValue), 1)
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    selectedExercise(event: MatAutocompleteSelectedEvent): void {
        let exercise = new exerciseList();
        exercise.id = this.exerciseList.find(c=> c.pavadinimas == event.option.viewValue).pratimoId;
        exercise.priej = 1;
        exercise.skaic = 1;
        this.selectedExerciseList.push(exercise)        
        this.exercises.push(event.option.viewValue);
        this.exercisesListas.splice(this.exercisesListas.indexOf(event.option.viewValue), 1)
        this.exerciseInput.nativeElement.value = '';
        this.exerciseCtrl.setValue(null);
    }

    private _filterUSers(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.usersList.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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

    loadExexrcise() {
        this.filteredExercise = this.exerciseCtrl.valueChanges.pipe(
            startWith(null),
            map((exercises: string | null) => exercises ? this._filterExercise(exercises) : this.exercisesListas.slice()));
    }

    sendRequest() {
        this.treniruotesInfo.trenerioId = this.uiService.getUserIdFromCookie();
        this.treniruotesInfo.vartId = this.usersIDs;        
        this.treniruotesInfo.prat = this.selectedExerciseList;
        this.backendServide.createTreinuorte(this.treniruotesInfo).subscribe(result => {
            this.snackService.callSuccessSnackBar('Workout created successfully');
        }, error => {
            this.snackService.callErrorSnackBar('Something went wrong');
        })
    }

}