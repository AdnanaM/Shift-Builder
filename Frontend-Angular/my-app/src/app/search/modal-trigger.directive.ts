import {Directive, Input, OnInit, Inject, ElementRef} from '@angular/core'
import { JQ_TOKEN } from './jquery.service'

@Directive({
    selector:'[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    private el!: HTMLElement //we use HTMLElement, which is a JS Object to get the actual DOM element
    /**
     * modal-trigger is not going to work as an identifier name because dashes are not allowed -> we need an alias ->
     * -> we will give as a parameter the attribute we want as property and give the property a proper name
     */
    @Input('modal-trigger') modalId!: string

    constructor (ref: ElementRef, @Inject(JQ_TOKEN) private $: any){ // ElementRef is a typical Angular 2's object which is pointer to a specific element and it is a wrapper for DOM element
        this.el = ref.nativeElement
    }

    /**
     * In ngOnInit() method we will call the modal function from jQuery. To do so, we need the follwoing:
     * - import JQ_TOKEN, as we need JQuery to be part of this class -> we are using @Inject() and 
     * will create a private variable - $ and will assign it to any, because the API for jQuery is really rather complex
     * - in ngOnInit, we will call this.$() which is the jQuery function
     * - we will pass the id of the modal that we want to open up -> sample-modal
     */
    ngOnInit(): void {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({}) // modal method id called with an empty object because it expects a configuration object
        })
        
    }
}

/**
 * Enhancements
 *I.  Binding an Id
    Although the modal is displayed properly in our app, there is a weakness because we are using an id, and
 *  in our trigger we are saying that we should open a modal with that particular id -#simple-modal, 
 * we could never have two different modals in our app - this is a generic modal pop-up and should be used multiple times
 * We need a customizable id, To do that, in our navbar.component.html, where we created the <simple-modal>, 
 * we should add an elementId and call it, for example searchResults -> this will be an input property
 * One other thing you should do is to pass in the same id as the value of the attribute  ->modal-trigger inside the navbar.component.html -> this will become a new input property,
 * this time in a directive which has a similar behaviour as a component. The name of the property will be the name of the attribute
 * Having this new input property, you can use it when you call the modal methos -> this.$(`#${this.modalId}`)
 * 
 * II. Routing to the same component
 *  There is an issue with our event-list component -> in ngOnInit method we set the current event to be equal to the eventService.getEvent, 
 * but we are passing in this.route.snapshot and then parameterId which is the Id parameter of our route.
 * Also the parameters of the route are acctually exposed as an observable but snapsot is not -> we need a subcription to the route parameters
 * 
 * III. Using @ViewChild Decorator
 * Problem: when the modal dialog is opened and you click on a session, the pop-up is stil shows up
 * Solution: add a click event handler to the main body of the dialog box, listen to that and close the model when we click on it
 * In simple-modal template , on modal-body class, (click)="closeModal()". Then we will define a template refference variable #modalcontainer that will be passed as a parameter for our ViewChild() decorator.
 * Also, we will use ElementRef to access the actual DOM node -> containerEl.nativeElement. Lastly, this will be pass in as a param for our jQuery modal method -> .modal('hide')
    */
