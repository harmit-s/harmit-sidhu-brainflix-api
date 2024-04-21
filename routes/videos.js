import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

const idFilter = req => video => video.id === parseInt(req.params.id);

router.get("/", (req, res) => {
    res.status(200).json("/videos");
})

router.get("/:videoId", (req, res) => {

    const { videoId } = req.params;
    // do the js logic to lookup the video with that id
    res.status(200).json(`You are looking for video with id: ${videoId}`)
})


router.post("/", (req, res) => {
    const newVideo = {
        ...req.body,
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        imageUrl: '/images/hardcoded.jpg'  
    };

    if (!newVideo.title || !newVideo.description) {
        return res.status(400).json({ msg: 'Please include a title and description' });
    }
    
    videos.push(newVideo);

    res.status(201).json({ 
        msg: `New video created with title: ${req.body.title} and description: ${req.body.description}`, 
        video: newVideo 
    });
});

module.exports = router;