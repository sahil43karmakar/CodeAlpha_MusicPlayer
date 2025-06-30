
    
const songs = [
  {
    title: 'Track 1',
    artist: 'SAMPLELIB',
    src: 'sample-9s.mp3',
    cover: 'cover-1.png'
  },
  {
    title: 'Track 2',
    artist: 'DRUMS',
    src: 'sample-15s.mp3',
    cover: 'cover-2.png'
  },
  {
    title: 'Track 3',
    artist: 'RANDOM',
    src: 'sample-12s.mp3',
    cover: 'cover3.png'
  }
];

  

    let currentSong = 0;
    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const playBtn = document.getElementById('play');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const volumeSlider = document.getElementById('volume');
    const durationText = document.getElementById('duration');
    const playlist = document.getElementById('playlist');

    function loadSong(index) {
      const song = songs[index];
      title.textContent = song.title;
      artist.textContent = song.artist;
      cover.style.backgroundImage = `url(${song.cover})`;
      audio.src = song.src;
    }

    function togglePlayPause() {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
      } else {
        audio.pause();
        playBtn.textContent = '▶';
      }
    }

    function prevSong() {
      currentSong = (currentSong - 1 + songs.length) % songs.length;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = '⏸';
    }

    function nextSong() {
      currentSong = (currentSong + 1) % songs.length;
      loadSong(currentSong);
      audio.play();
      playBtn.textContent = '⏸';
    }

    audio.addEventListener('timeupdate', () => {
      const { duration, currentTime } = audio;
      const percent = (currentTime / duration) * 100;
      progress.style.width = percent + '%';
      durationText.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });

    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
    });

    volumeSlider.addEventListener('input', (e) => {
      audio.volume = e.target.value;
    });

    audio.addEventListener('ended', () => {
      nextSong();
    });

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function buildPlaylist() {
      playlist.innerHTML = '';
      songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.textContent = `${song.title} - ${song.artist}`;
        item.onclick = () => {
          currentSong = index;
          loadSong(index);
          audio.play();
          playBtn.textContent = '⏸';
        };
        playlist.appendChild(item);
      });
    }

    loadSong(currentSong);
    buildPlaylist();
    volumeSlider.value = 1;