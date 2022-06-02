import { Router } from 'express';
import UserController from '../controllers/userController';
import StoryController from '../controllers/storyController';

const router: Router = Router();

// router.post('/hello', UserController.helloworld)
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

router.post('/save', StoryController.save)
router.post('/gethistory', StoryController.getHistory);

export default router;
