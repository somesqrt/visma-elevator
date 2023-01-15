import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  player: HTMLAudioElement;
  fadeInterval: any;

  constructor() {
    this.player = new Audio();
    this.player.src = 'assets/music/elevator-music.mp3';
    this.player.loop = true;
  }

  play() {
    this.player.play();
  }

  setVolume(volume: number) {
    this.player.volume = volume;
  }

  fadeOut(minValue: number) {
    let currentVolume = this.player.volume;
    let fadeStep = 0.025;

    this.fadeInterval = setInterval(() => {
      if (minValue ! <= currentVolume - fadeStep) {
        clearInterval(this.fadeInterval);
        this.player.volume = minValue;

      } else {
        this.player.volume -= fadeStep;
      }
    }, 50);
  }

  fadeIn(maxVolume: number) {
    let fadeStep = 0.05;
    this.play();
    this.fadeInterval = setInterval(() => {
      if (this.player.volume >= maxVolume - fadeStep) {
        clearInterval(this.fadeInterval);
        this.player.volume = maxVolume;
      } else {
        this.player.volume += fadeStep;
      }

    }, 50);
  }

}
