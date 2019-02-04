export default class MusicPlayer {
  constructor(audio, src, onError, onLoaded, onEnded) {
    this.audio = audio;
    this.src = src;
    this.onError = onError;
    this.onLoaded = onLoaded;
    this.onEnded = onEnded;
  }

  static createPlayer({
    audio, src, onError, onLoaded, onEnded,
  }) {
    return new MusicPlayer(audio, src, onError, onLoaded, onEnded).load();
  }

  load = () => {
    this.audio.src = this.src;
    this.audio.addEventListener('loadedmetadata', this.onLoaded);
    this.audio.onerror = this.onError;
    this.audio.addEventListener('ended', this.onEnded);

    return this;
  };

  get duration() {
    return this.audio.duration || 0;
  }

  get currentTime() {
    return this.audio.currentTime || 0;
  }

  play = () => {
    this.audio.play();
  };

  destory = () => {
    this.audio.removeEventListener('loadedmetadata', this.onLoaded);
    this.audio.removeEventListener('error', this.onError);
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.src = null;
  };

  pause = () => {
    this.audio.pause();
  };
}
