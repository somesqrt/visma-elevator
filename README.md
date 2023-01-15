# Author: Stanislav Ivanov

## Description of solution

On each of the 10 floors there are two call buttons indicating where the person is going to go (except for the extreme ones, since only one direction of movement is possible on them). 
In the elevator itself there are 10 buttons (since there are 10 floors), each of which is responsible for starting the movement of the elevator to its floors. 
When the elevator starts moving, music turns on. Every floor has a randomly generated texture.

## Technologies and libraries
**Node.js version:** v16.17.1<br>
**Angular version:** 14.2.10<br>
**fontawesome** - used for icons on elevator call buttons on floors<br>

## Elevator algorithm

There is a **queue** that contains invocations sorted according to the following rules:


+ We take the last invocation added to this queue, because only the last one added may be out of order. 
+ Then we check whether it is the only one invocation in the queue, if it is so, then we have no invocations to reprioritize.
+ It is also meaningless to add an invocation to the queue if it was made at the same floor where the elevator is at.
+ After that, similarly to the bubble sort, we begin to check the last added invocation with everything in queue, starting from the first up to the penultimate one.
+ If the direction of the checked invocation coincides with the last one added, we go to check the floor to which the elevator was called. 
If the directions do not match, we go to compare the next invocation.
+ Next, we need to understand the direction of the elevator movement (Up or DOWN), whether the stop on the first invocation in the queue is later than the last one added, 
and whether the floor of the last added invocation is ahead of the direction of the elevator movement.
+ If we found a match then we move the last added invocations to the place of the one we are checking and move the row 1 unit to the right of it, 
and stop the checking cycle since we have already found the best position for the added invocations.


## Spinning up
1. `cd elevator` - go to project folder 
2. `npm i` - install dependencies 
3. `ng serve` - run web-server
