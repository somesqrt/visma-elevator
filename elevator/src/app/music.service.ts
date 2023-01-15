import { Injectable } from '@angular/core';

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

  pause() {
    this.player.pause();
  }

  toggle() {
    if (this.player.paused) {
      this.fadeIn()
    } else {
      this.fadeOut()

    }
  }

  setVolume(volume: number) {
    this.player.volume = volume;
  }

  fadeOut() {
    let currentVolume = this.player.volume;
    let fadeStep = 0.34;

    this.fadeInterval = setInterval(() => {
      if (this.player.volume <= fadeStep) {
        clearInterval(this.fadeInterval);
        this.player.volume = 0;
        this.pause();
      } else {
        this.player.volume -= fadeStep;
      }
    }, 50);
  }

  fadeIn() {
    this.setVolume(0)
    let maxVolume = 1;
    let fadeStep = 0.1;

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
