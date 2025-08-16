import express from 'express';
import { getpublishedcreations, getusercreations, tooglelikecreations } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';


const userRouter=express.Router();

userRouter.get('/get-user-creations',auth,getusercreations)
userRouter.get('/get-published-creations',auth,getpublishedcreations)
userRouter.post('/toggle-like-creation',auth,tooglelikecreations)

export default userRouter;