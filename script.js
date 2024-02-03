class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.trackDetails = {
            name: '',
            artist: '',
            duration: 0
        };
        this.timerInterval = null;

        this.audio.addEventListener('ended', () => {
            this.next();
        });

        this.audio.addEventListener('timeupdate', () => {
            this.updateTimer();
        });
    }

    playpause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play();
            this.isPlaying = true;
        }
    }

    previous() {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            this.loadTrack();
            this.play();
        }
    }

    next() {
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.currentTrackIndex++;
            this.loadTrack();
            this.play();
        }
    }

    seekTo() {
        const seekSlider = document.querySelector('.seek_slider');
        const seekValue = seekSlider.value;
        const currentTime = (seekValue / 100) * this.audio.duration;
        this.audio.currentTime = currentTime;
    }

    setVolume() {
        const volumeSlider = document.querySelector('.volume_slider');
        const volumeValue = volumeSlider.value;
        this.audio.volume = volumeValue / 100;
    }

    loadTrack() {
        const trackPath = this.playlist[this.currentTrackIndex];
        this.audio.src = trackPath;
        this.trackDetails.name = trackPath.split('/').pop().split('.').shift(); 
        this.trackDetails.artist = 'Unknown'; 
        this.updateTrackDetails();
    }

    updateTrackDetails() {
        const trackNameElem = document.querySelector('.track-name');
        const trackArtistElem = document.querySelector('.track-artist');
        trackNameElem.textContent = this.trackDetails.name;
        trackArtistElem.textContent = this.trackDetails.artist;
    }

    updateTimer() {
        const currentTimeElem = document.querySelector('.current-time');
        const totalDurationElem = document.querySelector('.total-duration');
        const seekSlider = document.querySelector('.seek_slider');
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;

        currentTimeElem.textContent = this.formatTime(currentTime);
        totalDurationElem.textContent = this.formatTime(duration);

        const progress = (currentTime / duration) * 100;
        seekSlider.value = progress;
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}


const player = new MusicPlayer();
player.playlist = [
    'Hymn for the Weekend.mp3',
    'Believer.mp3'
];
player.loadTrack(); 
