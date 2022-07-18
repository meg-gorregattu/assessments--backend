const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")


const getSongsBtn = document.getElementById("show-songs")
const songsContainer = document.getElementById('songs-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/songs`

const songsCallback = ({ data: songs }) => displaySongs(songs)
const errCallback = err => console.log(err.response.data)

const getAllSongs = () => axios.get(baseURL).then(songsCallback).catch(errCallback);
const deleteSong = id => axios.delete(`${baseURL}/${id}`).then(songsCallback).catch(errCallback)
const createSong = body => axios.post(baseURL, body).then(songsCallback).catch(errCallback)
const updateSong = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(songsCallback).catch(errCallback)



function sumbitHandler(e) {
    e.preventDefault()

    let title = document.getElementById('title')
    let artist = document.getElementById('artist')
    let album = document.getElementById('album')
    let rating = document.querySelector('input[name="ratings"]:checked')

    let bodyObj = {
        title: title.value,
        artist: artist.value, 
        album: album.value,
        rating: rating.value

    }

    createSong(bodyObj)

    title.value = ''
    artist.value = ''
    album.value = ''
    rating.checked = false
};


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};


const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};



function createSongCard(song) {
    const songCard = document.createElement('div')
    songCard.classList.add('song-card')

    songCard.innerHTML = `
    <p class="song-title">Title: ${song.title}</p>
    <p class="song-artist">Artist: ${song.artist}</p>
    <p class="song-album">Album: ${song.album}</p>
    <button onclick="deleteSong(${song.id})">delete</button><br>
    <div class="btns-container">
    <button onclick="updateSong(${song.id}, 'minus')">-</button>
    <p class="song-rating">Rating: ${song.rating}</p>
    <button onclick="updateSong(${song.id}, 'plus')">+</button>
    </div>
    `


    songsContainer.appendChild(songCard)
};


function displaySongs(arr) {
    songsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createSongCard(arr[i])
    }
}

getAllSongs();

complimentBtn.addEventListener('click', getCompliment);

fortuneBtn.addEventListener('click', getFortune);

form.addEventListener('submit', sumbitHandler);
