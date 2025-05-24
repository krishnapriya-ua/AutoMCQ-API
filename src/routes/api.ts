import express from 'express';
import upload from './uploadconfig';
import videoController from '../controllers/controller';

const router = express.Router();

router.post('/upload', upload.single('video'), videoController.handleVideoUpload);

router.post('/text', upload.single('video'), videoController.getText); 

router.get('/mcq',videoController.getMCQ)

export default router;