import {Component, Input, Output} from '@angular/core';
import {Invocation} from "./model/Invocation";
import {Directions} from "./model/Directions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  invocationLine: Invocation[] = []
  currentFloor: number = 1;
  currentElevatorPosition: number = 1;
  movementTime: number = 0;
  bgs: string[] = []

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.bgs.push('url(assets/img/floor-bg' + (Math.floor(Math.random() * 8) + 1) +'.jpeg)')
    }
  }

  callElevatorFromElevator(callTo: any){
    this.callElevator(callTo.invocationFloor, callTo.direction);
  }
  callElevator(floor: number, direction: Directions) {
    this.invocationLine = [
      ...this.invocationLine,
      {invocationFloor: floor, direction: direction}
    ]
  }
}
