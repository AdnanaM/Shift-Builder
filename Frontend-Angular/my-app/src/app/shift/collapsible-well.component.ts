import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { IShift } from "./shift.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'collapsible-well',
    templateUrl:'./collapsible-well.component.html',
    styleUrls: ['./collapsible-well.component.css']
})

export class CollapsibleWellComponent {
    @Input() title!: String
    visible: boolean = true


    constructor(private route:ActivatedRoute){}

    
    toggleContent(){
        this.visible = !this.visible
    }
}






