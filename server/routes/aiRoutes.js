import express from "express";
import { auth } from '../middleware/auth.js';
import { generateArticle, generateblogtitle, generateImage, removeimagebackground, removeimageobject, resumereview } from '../controllers/aiController.js';
import { upload } from "../config/multer.js";

const aiRouter = express.Router();

aiRouter.post('/generate-article',auth,generateArticle);
aiRouter.post('/generate-blog-title', auth, generateblogtitle);
aiRouter.post('/generate-image', auth, generateImage);
aiRouter.post('/remove-image-background',auth, upload.single('image'),removeimagebackground);
aiRouter.post('/remove-image-object', upload.single('image'), auth, removeimageobject);
aiRouter.post('/resume-review', upload.single('resume'), auth, resumereview);


export default aiRouter;