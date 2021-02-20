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

@Component({
    selector: 'editWorkout-dialog',
    templateUrl: 'editWorkout.html',
})
export class EditWorkout {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    
    editData = new WorkoutEditData();
    isLoaded: boolean = false;
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

    constructor(private _formBuilder: FormBuilder, private backendService: BackEndService, @Inject(MAT_DIALOG_DATA) public data: any) {
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
        })
    }
    

    loadExexrcise() {
        this.filteredExercise = this.exerciseCtrl.valueChanges.pipe(
            startWith(null),
            map((exercises: string | null) => exercises ? this._filterExercise(exercises) : this.exercisesListas.slice()));
    }

    private _filterExercise(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.exercisesListas.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    removeExercise(pratId: string): void {
        let searchForValues = this.editData[0].treniruotesPratymai.find(c=> c.pratymoId == pratId);
        const index = this.editData[0].treniruotesPratymai.indexOf(searchForValues);
        if (index >= 0) {            
            this.exercisesListas.push(searchForValues.pavadinimas);
            this.editData[0].treniruotesPratymai.splice(index, 1);
            this.loadExexrcise();
        }
    }

    addExercise(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;       
        this.exercisesListas.forEach(rez => {
            if (rez == value) {
                this.exercisesListas.splice(this.exercisesListas.indexOf(value), 1)
                if ((value || '').trim()) {
                    console.log(true);
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

    selectedExercise(event: MatAutocompleteSelectedEvent): void {
        let exercise = new treniPrat();
        exercise.treniruotesId = this.editData[0].treniruotesId;
        exercise.pratymoId = this.exerciseList.find(c=> c.pavadinimas == event.option.viewValue).pratimoId;
        exercise.priejimai = 1;
        exercise.skaicius = 1;
        exercise.pavadinimas = event.option.viewValue;
        this.editData[0].treniruotesPratymai.push(exercise);
        this.exercisesListas.splice(this.exercisesListas.indexOf(event.option.viewValue), 1)
        this.exerciseInput.nativeElement.value = '';
        this.exerciseCtrl.setValue(null);
        this.loadExexrcise();
    }

    aa() {
        console.log(this.editData);

    }
}