import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';


@Component({
    selector: 'createNewWorkout-dialog',
    templateUrl: 'createNewWorkout.html',
})
export class CreateNewWorkout {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;



    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    fruitCtrl = new FormControl();
    filteredUsers: Observable<string[]>;
    users: string[] = [];
    usersList: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
    
    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    exerciseCtrl = new FormControl();
    filteredExercise: Observable<string[]>;
    exercises: string[] = [];
    exercisesList: string[] = ['Nugara', 'Kojos', 'krutine', 'bicke', 'Tricepsas'];


    @ViewChild('exerciseInput') exerciseInput: ElementRef<HTMLInputElement>;
    @ViewChild('autoExercise') matAutocompleteExercise: MatAutocomplete;


    constructor(private _formBuilder: FormBuilder) {
        this.loadExexrcise();
        this.loadUsers();
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

        this.exercisesList.forEach(rez => {
            if (rez == value) {
                this.exercisesList.splice(this.exercisesList.indexOf(value), 1)
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

    removeUser(fruit: string): void {
        const index = this.users.indexOf(fruit);
        if (index >= 0) {
            this.users.splice(index, 1);
            this.usersList.push(fruit);
            this.loadUsers();
        }
    }

    removeExercise(fruit: string): void {
        const index = this.exercises.indexOf(fruit);
        if (index >= 0) {
            this.exercises.splice(index, 1);
            this.exercisesList.push(fruit);
            this.loadExexrcise();
        }
    }

    selectedUser(event: MatAutocompleteSelectedEvent): void {
        this.users.push(event.option.viewValue);
        this.usersList.splice(this.usersList.indexOf(event.option.viewValue), 1)
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    selectedExercise(event: MatAutocompleteSelectedEvent): void {
        this.exercises.push(event.option.viewValue);
        this.exercisesList.splice(this.exercisesList.indexOf(event.option.viewValue), 1)
        this.exerciseInput.nativeElement.value = '';
        this.exerciseCtrl.setValue(null);
    }

    private _filterUSers(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.usersList.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    private _filterExercise(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.exercisesList.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    loadUsers(){
        this.filteredUsers = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((users: string | null) => users ? this._filterUSers(users) : this.usersList.slice()));
    }
    
    loadExexrcise(){
        this.filteredExercise = this.exerciseCtrl.valueChanges.pipe(
            startWith(null),
            map((exercises: string | null) => exercises ? this._filterExercise(exercises) : this.exercisesList.slice()));
    }
}