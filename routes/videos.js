import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const getVideos = () => {
    try {
        const videosData = fs.readFileSync('./data/videos.json', 'utf8');
        return JSON.parse(videosData);
    } catch (err) {
        console.error('Error reading videos data:', err);
        return [];
    }
};

const updateVideos = (videoData) => {
    try {
        fs.writeFileSync('./data/videos.json', JSON.stringify(videoData, null, 2), 'utf8');
    } catch (err) {
        console.error('Error updating videos data:', err);
    }
};

router.get("/", (req, res) => {
    const videos = getVideos();

    const formattedVideos = videos.map(video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    }));

    res.status(200).json(formattedVideos);
});

router.get("/:id", (req, res) => {
    const videos = getVideos();
    const foundVideo = videos.find(video => video.id === req.params.id);
    if (foundVideo) {
        res.status(200).json(foundVideo);
    } else {
        res.status(404).json({ error: 'Video not found' });
    }
});

router.post("/", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Please include a title and description' });
    }

    const newVideo = {
        id: uuidv4(),
        title,
        description,
        image: 'http://localhost:8080/images/hardcoded.jpg',
        channel: "Harmit Sidhu",
        views: 0,
        likes: 0,
        duration: "3:01",
        timestamp: Date.now(),
        comments: []
    };

    let videos = getVideos();
    videos.push(newVideo);
    updateVideos(videos);

    res.status(201).json({ message: 'New video created', video: newVideo });
});

router.post("/:id/comments", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Please include a comment text' });
    }

    const videos = getVideos();
    const videoIndex = videos.findIndex(video => video.id === req.params.id);

    if (videoIndex === -1) {
        return res.status(404).json({ error: 'Video not found' });
    }

    const newComment = {
        id: uuidv4(),
        text,
        timestamp: Date.now()
    };

    videos[videoIndex].comments.push(newComment);
    updateVideos(videos);

    res.status(201).json({ message: 'New comment added', comment: newComment });
});

export default router;