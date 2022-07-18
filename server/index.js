const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

//--------------------------------------------------------------------------------

const { getCompliment } = require('./controller')
app.get("/api/compliment", getCompliment);

const { getFortune } = require('./controller')
app.get("/api/fortune", getFortune);


//--------------------------------------------------------------------------------

const { getSongs, deleteSong, createSong, updateSong } = require('./controller')

app.get("/api/songs", getSongs);
app.delete('/api/songs/:id', deleteSong);
app.post('/api/songs',  createSong);
app.put('/api/songs/:id',  updateSong)

app.listen(4000, () => console.log("Server running on 4000"));
