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
    filteredFruits: Observable<string[]>;
    users: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


    constructor(private _formBuilder: FormBuilder) {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((users: string | null) => users ? this._filter(users) : this.allFruits.slice()));
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



    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        this.allFruits.forEach(rez => {
            if (rez == value) {
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

    remove(fruit: string): void {
        const index = this.users.indexOf(fruit);

        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.users.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
}