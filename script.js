const audio = document.querySelector("audio");
const playbtn = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const image = document.querySelector("img");
let title = document.getElementById("title");
const artist = document.getElementById("artist");
const progresscontainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durations = document.getElementById("duration");
const currenttimee = document.getElementById("current-time");

const songs = [
  {
    name: "jacinto-1",
    displayname: "Electric Chill Machine",
    artist: "josinto design",
  },
  {
    name: "jacinto-2",
    displayname: "the second song",
    artist: "josinto design",
  },
  {
    name: "jacinto-3",
    displayname: "the third song",
    artist: "josinto design",
  },
];

let isplaying = false;
//play
function play() {
  isplaying = true;
  playbtn.classList.replace("fa-play", "fa-pause");
  playbtn.setAttribute("title", "pause");

  audio.play();
}

//paause
function pause() {
  isplaying = false;
  playbtn.classList.replace("fa-pause", "fa-play");
  playbtn.setAttribute("title", "play");

  audio.pause();
}
function loadsong(song) {
  title.textContent = song.displayname;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let index = 0;
function nextsong() {
  if (index < songs.length - 1) {
    index++;
    loadsong(songs[index]);
    play();
  } else {
    index = 0;
    loadsong(songs[index]);
    play();
  }
}

function prevsong() {
  if (index >= 0) {
    index--;
    loadsong(songs[index]);
    play();
  } else {
    index = songs.length - 1;
    loadsong(songs[index]);
    play();
  }
}

//update progress
function updateprogress(e) {
  if (isplaying) {
    let { currentTime, duration } = e.srcElement;
    const percent = (currentTime / duration) * 100;

    progress.style.width = `${percent}%`;

    const durationminute = Math.floor(duration / 60);
    let durationseconds = Math.floor(duration % 60);

    if (durationseconds < 10) {
      durationseconds = `0${durationseconds}`;
    }
    if (durationseconds) {
      durations.textContent = `${durationminute}:${durationseconds}`;
    }

    let currentmin = Math.floor(currentTime / 60);
    let currentsec = Math.floor(currentTime % 60);

    currenttimee.textContent = `${currentmin}:${currentsec}`;
  }
}

function setProgressBar(e) {
  let width = this.clientWidth;
  let click = e.offsetX;
  const { duration } = audio;

  audio.currentTime = (click / width) * duration;
}

playbtn.addEventListener("click", () => (isplaying ? pause() : play()));

prev.addEventListener("click", prevsong);
next.addEventListener("click", nextsong);
audio.addEventListener("timeupdate", updateprogress);
audio.addEventListener("ended", nextsong);
progresscontainer.addEventListener("click", setProgressBar);
