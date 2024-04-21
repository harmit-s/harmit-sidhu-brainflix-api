import express from 'express';
import cors from 'cors';
import videosRouter from './routes/videos.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));

app.use('/videos', videosRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
