let songs = require('./db.json');
let globalID = 11

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A fresh start will put you on your way.", "Adventure can be real happiness.", "Bide your time, for success is near.", "Do not let ambitions overshadow small success.", "Failure is the chance to do better next time.", "If you wish to see the best in others, show the best of yourself.", "Love lights up the world."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    getSongs: (req, res) => {
            res.status(200).send(songs)
    },
    deleteSong: (req, res) => {
        let index = songs.findIndex(elem => elem.id === +req.params.id);
        songs.splice(index, 1);
        res.status(200).send(songs);
    },
    createSong: (req, res) => {
        const {title, artist, album, rating} = req.body;
        let newSong = {
            id: globalID,
            title,
            artist,
            album,
            rating: +rating
        }
        songs.push(newSong);
        globalID++;
        res.status(200).send(songs);
    },
    updateSong: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        let index = songs.findIndex(elem => +elem.id === +id);
        console.log(type);
        if(type === 'minus' && songs[index].rating > 1){
            songs[index].rating -= 1;
            res.status(200).send(songs);
        } else if(type === 'plus' && songs[index].rating < 10){
            songs[index].rating += 1;
            res.status(200).send(songs);
        } else {
            res.status(400).send('Invalid rating!')
        }
    }
}