import { Router } from 'express';
import UserController from '../controllers/userController';
import StoryController from '../controllers/storyController';

const router: Router = Router();

// router.post('/hello', UserController.helloworld)
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

router.post('/save', StoryController.save)
<<<<<<< HEAD
router.get('/renderLobby', StoryController.renderLobby)
router.get("/renderLobby/:id", StoryController.renderLobby);
=======
router.post('/gethistory', StoryController.getHistory);
>>>>>>> 9e286a88a8a7b005508ffe08419307003393e8ad

export default router;
