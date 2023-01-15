import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {Directions} from "../model/Directions";

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnChanges {

  iconChevronUp = faChevronUp;
  iconChevronDown = faChevronDown;

  @Input() displayUpButton: boolean = true
  @Input() displayDownButton: boolean = true
  @Input() bg!: string
  @Input() endUpFloor: boolean = false;
  @Input() endDownFloor: boolean = false;
  @Input() currentFloor: boolean = false;
  @Input() myFloor!: number;
  @Input() elevatorFloor!: number;
  @Input() targetFloor!: number;
  @Output() buttonPressed = new EventEmitter<Directions>()

  buttons = [
    {direction: "Up", active: false},
    {direction: "Down", active: false}
  ]

  onUpButtonClick() {
    this.buttons[0].active = true

    if (this.endUpFloor) {
      this.buttonPressed.emit("DOWN")
    } else {
      this.buttonPressed.emit("UP")
    }
  }

  onDownButtonCLick() {
    this.buttons[1].active = true

    if (this.endDownFloor) {
      this.buttonPressed.emit("DOWN")
    } else {
      this.buttonPressed.emit("UP")
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.myFloor === this.elevatorFloor && this.targetFloor === this.elevatorFloor) {
      this.buttons[0].active = false;
      this.buttons[1].active = false;
    }

  }

}
