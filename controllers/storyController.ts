import Story from '../models/Stories';
import { Response, Request } from 'express';

const StoryController = {
	save: async (req: Request, res: Response) => {
		try {
			console.log('save');
			const { title, content, genre } = req.body;

			if (title !== '' && content !== '') {
				console.log('title', title);
				console.log('content', content);

				const newStory = await new Story({
					title,
					content,
					genre,
				}).save();

				console.log('new', newStory.title, newStory.content);
				return res.status(200).json(newStory);
			}
		} catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// renderLobby: async (req: Request, res: Response) => {
	// 	try {
	// 		const { id: _id } = req.params;
	// 		const { title, content, genre } = req.params;

	// 		const Lobby = await Story.find();

	// 		console.log('Lobby', Lobby);
	// 		return res.status(200).json(Lobby);
	// 	} catch (err) {
	// 		return res.status(500).json({ message: 'Internal Server Error' });
	// 	}
	// },
	renderLobby: async (req: Request, res: Response) => {
        try {
            const { id: _id } = req.params;
            const noSelect = [
                "-password",
                "-email",
            ];
            if (_id) {
                const story = await Story.findOne({ _id }, noSelect).exec();
                return res.status(200).json(story);
            } else {
                const stories = await Story.find({}, noSelect).exec();
                return res.status(200).json(stories);
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
};

export default StoryController;
