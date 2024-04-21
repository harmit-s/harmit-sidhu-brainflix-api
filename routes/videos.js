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
router.get("/videos", (req, res) => {
    const videos = getVideos();

    const getNextVideos = videos.map(video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    }));
    res.status(200).json({ getNextVideos }); 
});

router.get("/:videoId", (req, res) => {
    const { videoId } = req.params;
    const videos = getVideos();
    const foundVideo = videos.find(video => video.id === videoId);
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
        image: '/images/hardcoded.jpg',
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

export default router;