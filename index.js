//ass: Mr Sif
class Mp3 {
    static cont = 0
    constructor() {
        this.audioMp3 = document.querySelector('#soundMp3');
        this.arraySounds = [];
        this.checkerButtonPlay = 0;
        this.indexSong = 0;
        this.checkerFirtsSongAdd = true
        //evento de escuta no audio para dar uma atualização no tempo da musica  
        this.toListen = document.querySelector('audio').addEventListener('timeupdate', this.renderingRage_timeSong)

    }

    play() {

        if (this.audioMp3.readyState >= 4) { // Verifica se o áudio está pronto para ser reproduzido
            this.audioMp3.play();
            this.checkerButtonPlay++ >= 1 ? this.pause() : document.querySelector('.play').classList.add('pause');

        }
    }

    pause() {
        this.audioMp3.pause();
        this.checkerButtonPlay = 0;
        document.querySelector('.play').classList.remove('pause');
    }


    renderingSongs(index) {
        this.audioMp3.src = this.arraySounds[index].song;
        document.querySelector('#nameSongs').innerHTML = this.arraySounds[index].nameSong;
        // document.querySelector('.telaImg').src = this.arraySounds[index].img;
        document.querySelector('.play').classList.add('pause');
        this.audioMp3.play();
        this.checkerButtonPlay = 1;

    }

    renderListSongs() {
        for (let i = 0; i < this.arraySounds.length; i++) {
            this.CreateListSongs()
        }
    }
    //METODO PARA CRIAR LISTA DAS MUSICAS ADICIONADAS
    CreateListSongs() {
        const container = document.querySelector('.containerListSongs');
        const img = document.createElement('img');
        const card = document.createElement('div');
        const text = document.createElement('p');
        const deleteSong = document.createElement('button');


        img.classList.add('cardImg');
        card.classList.add('card');
        deleteSong.innerHTML = 'Delete';
        deleteSong.classList.add('delete');

        this.totalSongs(Mp3.cont += 1)

        for (let i = 0; i < this.arraySounds.length; i++) {

            text.innerHTML = this.arraySounds[i].nameSong;
            img.src = this.arraySounds[i].img;
            card.appendChild(img);
            card.appendChild(text);
            card.appendChild(deleteSong);
            //RENDERIZA A MUSICA DA LISTA QUE FOI CLICADA FAZENDO O CARD RECEBER UM EVENTO DE ONCLICK
            card.setAttribute('onclick', `mp3.renderingSongs(${i})`);


            deleteSong.addEventListener('click', () => {
                this.totalSongs(Mp3.cont - 1)
                document.querySelector('.play').classList.remove('pause');
                this.arraySounds.splice(i, 1);
                card.remove();
                this.pause();
                console.log(this.arraySounds)
            });

            container.appendChild(card);
        }

    }

    //FORMATA AS STRINGS PARA MELHOR INTERFACE
    formatStrings(string) {
        return string.charAt(0).toUpperCase() + string.slice(1, 25).toLowerCase() + "..."
    }

    totalSongs(cont) {

        document.querySelector("#mySongs").innerHTML = cont
    }

    //METODO PARA CAPTURAR OS ARQUIVOS ADICIONADOS
    addSongs() {
        const inputFiles = document.querySelector('#filesSongs');
        const files = inputFiles.files[0];
        //DESTRUCTION DO OBJETO ARQUIVO PARA SER ADIONADO ARRAY DE OBJETOS "ARRAYSOUNDS"
        const { name, size } = files;
        // CRIA UMA URL DO ARQUIVO RECEBIDO
        const imgUrl = URL.createObjectURL(files);

        this.arraySounds.push({ song: imgUrl, nameSong: this.formatStrings(name), img: "https://dk2dv4ezy246u.cloudfront.net/widgets/sSUHepLQIwU_large.jpg" })
        this.checkerFirtsSongAdd
        if (this.checkerFirtsSongAdd == true) {
            this.renderingSongs(0);
            this.checkerFirtsSongAdd = false
        }
        this.CreateListSongs();
    }

    renderingRage_timeSong() {
        let audioMp3 = document.querySelector('#soundMp3');

        //range da musica
        let range = document.querySelector('#range');

        //RANGE.MAX DEFINE O LIMITE DO RANGE, RANGE.VALUE CONRRESPONDE AO SEU VALOR DE POSIÇÃO ELE ESTÁ RECEBENDO O TEMPO CORRIDO DA MUSÍCA 
        range.max = audioMp3.duration;
        range.value = audioMp3.currentTime;

        // ADIOCIONAMOS UM EVENTO DE ESUCUTA AO RANGE PARA QUE QUANDO O USUARIO DESLIZAR O RANGE O TEMPO DA MUSICA MUDARA  
        range.addEventListener('input', () => {
            audioMp3.currentTime = range.value * range.max / 100;
            audioMp3.play()
        });

        //tempo decorrido da musica
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


        const checkerTimeSong = timeSong.innerHTML = `0${durationSongMinutes}:${durationSongSeconds}`
        //load da duração da musica quando a musica for alternada 
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
        this.indexSong--
        document.querySelector('.play').classList.add('pause');
        if (this.indexSong == -1) this.indexSong = this.arraySounds.length
        this.renderingSongs(this.indexSong);

    }
    //ESSA API NATIVA DO JS "PLAYBACKRATE" FAZ COM QUE A VELOCIDADE DA MUSICA MUDE
    // music_speed() {
    //     this.audioMp3.playbackRate = 1.5
    // }
}


var mp3 = new Mp3();

mp3.renderListSongs()



