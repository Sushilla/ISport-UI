import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'areYouSure-dialog',
    templateUrl: 'areYouSure.html',
})
export class AreYouSure {
    constructor() { }
}