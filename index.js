
class Mp3 {

    constructor() {
        this.audioMp3 = document.querySelector('#soundMp3');
        this.arraySounds = [
            {
                song: 'src/sounds/INTERWORLD _METAMORPHOSIS__317RHaFF7Xk.mp3',
                nameSong: 'INTERWORLD "METAMORPHOSIS"',
                img: 'https://i1.sndcdn.com/artworks-oJ0eLUhtByvCe00k-4BM8Mg-t500x500.jpg'

            },

        ];

        this.checkerButtonPlay = 0;
        this.indexSong = 0

        //evento de escuta no audio para dar uma atualização no tempo da musica  
        this.toListen = document.querySelector('audio').addEventListener('timeupdate', this.renderingRage_timeSong)

    }
    indexSongScreen() {
        this.audioMp3.src = this.arraySounds[0].song;
        document.querySelector('#nameSongs').innerHTML = this.arraySounds[0].nameSong;
        document.querySelector('.telaImg').src = this.arraySounds[0].img;
    }
    play() {
        this.audioMp3.play();
        if (this.checkerButtonPlay++ >= 1) {
            this.pause(this.audioMp3);
            document.querySelector('.play').classList.remove('pause')
        } else {
            document.querySelector('.play').classList.add('pause')
        }

    }

    pause(audioMp3) {
        return audioMp3.pause(), this.checkerButtonPlay = 0

    }

    renderingSongs(index) {

        this.audioMp3.src = this.arraySounds[index].song;
        document.querySelector('#nameSongs').innerHTML = this.arraySounds[index].nameSong;
        document.querySelector('.telaImg').src = this.arraySounds[index].img;

        this.audioMp3.play();

    }
    renderLIstSongs() {
        for (let i = 0; i < this.arraySounds.length; i++) {
            const img = document.createElement('img');
            img.classList.add('cardImg')
            const card = document.createElement('div');
            const text = document.createElement('p')
            const container = document.querySelector('.containerListSongs')
            img.src = this.arraySounds[i].img
            text.innerHTML = this.arraySounds[i].nameSong
            card.classList.add('card');
            card.appendChild(img)
            card.appendChild(text)
            container.appendChild(card)
        }
    }

    CreateListSongs() {
        const container = document.querySelector('.containerListSongs')
        const img = document.createElement('img');
        const card = document.createElement('div');
        const text = document.createElement('p');

        img.classList.add('cardImg');
        card.classList.add('card');

        for (let i = 0; i < this.arraySounds.length; i++) {

            text.innerHTML = this.arraySounds[i].nameSong.toLowerCase();
            img.src = this.arraySounds[i].img;


            card.appendChild(img);
            card.appendChild(text);
            container.appendChild(card);
        }

    }

    addSongs() {
        const inputFiles = document.querySelector('#filesSongs');
        const files = inputFiles.files[0];
        const { name, size } = files;
        const imgUrl = URL.createObjectURL(files);

        this.arraySounds.push({ song: imgUrl, nameSong: name.slice(0, 22), img: "https://i.pinimg.com/originals/07/a4/5e/07a45e02da91562edcc341664e85fdf8.gif" })

        this.CreateListSongs()

    }
    renderingRage_timeSong() {
        //range da musica
        var audioMp3 = document.querySelector('#soundMp3');

        let range = document.querySelector('#range');
        range.max = audioMp3.duration
        range.value = audioMp3.currentTime;

        range.addEventListener('input', () => {
            audioMp3.currentTime = range.value * audioMp3.duration / 100;

        });

        //ttempo decorrido da musica
        let timeCurrent = document.querySelector('#currentTime');
        let seconds = Math.floor(audioMp3.currentTime);
        let timeMinutes = Math.floor(seconds / 60);
        let timeSeconds = seconds % 60;

        if (timeSeconds < 10) timeSeconds = '0' + timeSeconds;
        timeCurrent.innerHTML = "0" + timeMinutes + ':' + timeSeconds;

        //duração da musica
        let timeSong = document.querySelector('#timeSong');
        let durationSongMinutes = Math.floor(audioMp3.duration / 60);
        let durationSongSeconds = Math.floor(audioMp3.duration % 60);


        if (durationSongSeconds < 10) durationSongSeconds = "0" + durationSongSeconds
        //load da duração da musica quando a musica for alternada 
        const checkerTimeSong = timeSong.innerHTML = `0${durationSongMinutes}:${durationSongSeconds}`
        if (checkerTimeSong != '0NaN:NaN') timeSong.classList.remove('imgLoad')
        if (checkerTimeSong == '0NaN:NaN') timeSong.classList.add('imgLoad'), timeSong.innerHTML = ''



    }



    // a vança para proxima musica
    next() {
        document.querySelector('.play').classList.add('pause');
        this.indexSong++

        //verifica se a quantidade de clicks foi igual ao total de musicas na array
        if (this.indexSong == this.arraySounds.length) this.indexSong = 0;
        this.renderingSongs(this.indexSong);

    }

    //volta na musica anterior
    previus() {
        document.querySelector('.play').classList.add('pause');

        this.indexSong--
        if (this.indexSong == -1) this.indexSong = this.arraySounds.length
        this.renderingSongs(this.indexSong);

    }

    music_speed() {
        this.audioMp3.playbackRate = 1.5
    }
}


var mp3 = new Mp3()


mp3.indexSongScreen()
mp3.renderLIstSongs()