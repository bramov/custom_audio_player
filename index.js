const playBtns = document.querySelectorAll('.playBtn');
const pauseBtns = document.querySelectorAll('.pauseBtn');
const player = document.querySelectorAll('.player');
const durationSliders = document.querySelectorAll('.duration');

const volumeSliders = document.querySelectorAll('.volumeSlider');

const totalSongDuration = document.querySelectorAll('.total_time_song');
const currentTimeSong = document.querySelectorAll('.current_time_song');


const state = {
    currentPlayingSong: null,
    playSong: function (el) {
        let track;
        console.log(el);
        if (el) {
            track = el.target.classList[1];
        } else {
            track = state.currentPlayingSong;
        }
        state.currentPlayingSong = track;
        for (let i = 0; i < player.length; i++){
            if (player[i] !== state.currentPlayingSong){
                player[i].pause();
                pauseBtns[i].style.display = 'none';
                playBtns[i].style.display = 'block';
            }
        }
        player[state.currentPlayingSong].play();
        playBtns[state.currentPlayingSong].style.display = 'none';
        pauseBtns[state.currentPlayingSong].style.display = 'block';
        let timer = setInterval(() => {
            durationSliders[track].value = player[track].currentTime/player[track].duration*100;
            currentTimeSong[track].innerHTML = Math.floor(player[track].currentTime);
            if (player[track].ended){
                pauseBtns[track].style.display = 'none';
                playBtns[track].style.display = 'block';
                player[track].currentTime = 0;
                state.currentPlayingSong++;

                //??????????
                state.playSong();

            }
        }, 1000);
    },
    pauseSong: function (el) {
        let track = el.target.classList[1];
        player[track].pause();
        pauseBtns[track].style.display = 'none';
        playBtns[track].style.display = 'block';
    },
    changeVolume: function (el) {
        let track = el.target.classList[1];
        player[track].volume = volumeSliders[track].value / 100;
    },
    changeCurrentTime: function (el, percent) {
        let track = el.target.classList[1];
        player[track].currentTime = percent * player[track].duration * 0.01;
    },
    clickOnProgressBar: function (el) {
        let clickPosition = el.pageX - this.offsetLeft;
        let percent = clickPosition / 5;
        state.changeCurrentTime(el, percent);
    },
    switchSong: function (el) {

    }
};



volumeSliders.forEach(el => {
    el.addEventListener('input', state.changeVolume);
});

playBtns.forEach(el => {
    el.addEventListener('click', state.playSong);
});
pauseBtns.forEach(el => {
    el.addEventListener('click', state.pauseSong);
});
durationSliders.forEach(el => {
    el.addEventListener('click', state.clickOnProgressBar);
});

player.forEach(el => {
    el.onloadedmetadata = function() {
        for (let i = 0; i < totalSongDuration.length; i++) {
            currentTimeSong[i].innerHTML = `${Math.floor(player[i].currentTime)}` + ' ';
            totalSongDuration[i].innerHTML = ' ' +  `/ ${Math.floor(player[i].duration)}`;
        }
    }
});