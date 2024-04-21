import fs from 'fs';
import express from 'express';
import cors from 'cors';


const app = express();


app.use(cors()); // any site can access
app.use(express.json()); // have to use to get post body

app.use("/public", express.static('images'));


import videoRoutes from './routes/videos.js';

const getVideos = () => {
    return JSON.parse(fs.readFileSync('./data/videos.json'));
}
  
  const updateVideos = (videoData) => {
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoData));
}

const get


app.route("/")
  .get((req, res) => {res.status(200).json("Works!")})
  .post((req, res) => res.status(200).json("Works!"))


app.use("/videos", (req, res, next) => {
  const { api_key } = req.query;
  if(!api_key) return res.status(401).json("unauthorized request");
  next();
})

app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
