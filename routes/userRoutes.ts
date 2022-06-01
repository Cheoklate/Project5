import { Router } from 'express';
import UserController from '../controllers/userController';
import StoryController from '../controllers/storyController';

const router: Router = Router();

// router.post('/hello', UserController.helloworld)
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

router.post('/save', StoryController.save)
router.get('/renderLobby', StoryController.renderLobby)
router.get("/renderLobby/:id", StoryController.renderLobby);

export default router;
