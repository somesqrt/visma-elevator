import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {Invocation} from "../model/Invocation";
import {MusicService} from "../services/music.service";

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnChanges {
  constructor(private musicService: MusicService) {
  }

  @Input() invocationLine: Invocation[] = [];

  @Output() currentTargetFloor = new EventEmitter<number>();
  @Output() movementTime = new EventEmitter<number>();
  @Output() currentElevatorPosition = new EventEmitter<number>();
  @Output() elevatorCall = new EventEmitter<Invocation>;

  element = document.getElementById("elevatorID")
  currentFloor = 1;
  Flag = true;
  floors = [
    {floorNumber: 1, active: false},
    {floorNumber: 2, active: false},
    {floorNumber: 3, active: false},
    {floorNumber: 4, active: false},
    {floorNumber: 5, active: false},
    {floorNumber: 6, active: false},
    {floorNumber: 7, active: false},
    {floorNumber: 8, active: false},
    {floorNumber: 9, active: false},
    {floorNumber: 10, active: false},
  ]
  floorUpdateInterval: any
  elevatorStartDelay: any;

  @ViewChild("elevator") elevatorElement!: ElementRef;

  onButtonClick(floorNumber: number) {
    this.floors[floorNumber - 1].active = true
    let newInvocation!: Invocation;
    if (this.currentFloor > floorNumber) {
      newInvocation = {
        invocationFloor: floorNumber,
        direction: "DOWN",
        directionRelativeToTheElevator: "DOWN"
      }
      this.elevatorCall.emit(newInvocation)
    } else if (this.currentFloor < floorNumber) {
      newInvocation = {
        invocationFloor: floorNumber,
        direction: "UP",
        directionRelativeToTheElevator: "UP"
      }
      this.elevatorCall.emit(newInvocation)
    } else {
      return;
    }
    this.Flag = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newInvocation: Invocation = this.invocationLine[this.invocationLine.length - 1]
    if (this.invocationLine.length < 1 || this.currentFloor === newInvocation.invocationFloor) {
      this.invocationLine.splice(this.invocationLine.indexOf(newInvocation), 1)

      return
    }
    for (let i = 0; i < this.invocationLine.length - 1; i++) {
      const currentCheckedInvocation = this.invocationLine[i]
      if (currentCheckedInvocation.directionRelativeToTheElevator !== newInvocation.directionRelativeToTheElevator && currentCheckedInvocation.direction !== newInvocation.direction) {
        continue;
      }

      const directionUpAndInvokerIsOnElevatorsWay = currentCheckedInvocation.direction == "UP"
        && currentCheckedInvocation.direction === newInvocation.direction
        && currentCheckedInvocation.invocationFloor >= newInvocation.invocationFloor
        && this.currentFloor < newInvocation.invocationFloor

      const directionDownAndInvokerIsOnElevatorsWay = currentCheckedInvocation.direction == "DOWN"
        && currentCheckedInvocation.direction === newInvocation.direction
        && currentCheckedInvocation.invocationFloor <= newInvocation.invocationFloor
        && this.currentFloor > newInvocation.invocationFloor

      if (directionUpAndInvokerIsOnElevatorsWay || directionDownAndInvokerIsOnElevatorsWay) {
        this.invocationLine.splice(this.invocationLine.indexOf(newInvocation), 1)
        this.invocationLine.splice(this.invocationLine.indexOf(currentCheckedInvocation), 0, newInvocation)

        break
      }
    }

    console.log(this.invocationLine)
    if (this.Flag) {
      this.startMoving();
      this.Flag = true
    }


  }

  startMoving() {
    this.musicService.fadeIn(1)
    clearInterval(this.floorUpdateInterval);
    console.log(this.invocationLine)
    clearTimeout(this.elevatorStartDelay)

    let oldPosition = this.element!.getBoundingClientRect().y

    this.musicService.setVolume(1)
    const floorOfCurrentDirection: Invocation = this.invocationLine[0]
    this.movementTime.emit(Math.abs(floorOfCurrentDirection.invocationFloor - this.currentFloor) * 2)

    console.log("Сейчас едем к: ", floorOfCurrentDirection.invocationFloor)

    this.elevatorStartDelay = setTimeout(() => {

      this.currentTargetFloor.emit(floorOfCurrentDirection.invocationFloor)
      this.floorUpdateInterval = setInterval(() => {
        console.log("старая ", oldPosition)
        console.log("новая ", this.element!.getBoundingClientRect().y)
        console.log("экран ", window.screen.height)
        if (floorOfCurrentDirection.directionRelativeToTheElevator === "UP" && Math.abs(oldPosition - this.element!.getBoundingClientRect().y) > this.elevatorElement.nativeElement.offsetHeight -5) {
          oldPosition = this.element!.getBoundingClientRect().y
          this.currentFloor++;
        } else if (floorOfCurrentDirection.directionRelativeToTheElevator === "DOWN" && Math.abs(oldPosition - this.element!.getBoundingClientRect().y) > this.elevatorElement.nativeElement.offsetHeight -5) {
          oldPosition = this.element!.getBoundingClientRect().y
          this.currentFloor--;
        }
        let counter = 0;
        if (Math.abs(oldPosition - this.element!.getBoundingClientRect().y) === 0) {
          counter++;
          if (counter === 2) {
            this.Flag = true
          }
        }
        this.currentElevatorPosition.emit(this.currentFloor);
        console.log(this.invocationLine)
        console.log(this.currentFloor)

        if (this.currentFloor === floorOfCurrentDirection.invocationFloor) {

          this.movementTime.emit(0)
          this.floors[this.currentFloor - 1].active = false;
          this.invocationLine.splice(this.invocationLine.indexOf(floorOfCurrentDirection), 1)
          clearInterval(this.floorUpdateInterval);
          if (this.invocationLine.length !== 0) {
            setTimeout(() => {
              this.startMoving()
            }, 500);
          } else {
            this.musicService.fadeOut(0.2)
            this.Flag = true
          }
        }


      }, 0.001)
    }, 1500)
  }
}
