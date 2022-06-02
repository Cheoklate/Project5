import Story from '../models/Stories'
import {Response,Request} from 'express'

const StoryController = {
  save: async (req: Request, res: Response) => {
    try {
      console.log("save")
      const {title, content,genre} = req.body

      if (title !== "" && content !== "") {
        console.log("title", title)
        console.log("content", content)

        const newStory = await new Story({
        title, 
        content,
      genre}).save()

          console.log("new",newStory.title, newStory.content)
        return res.status(200).json(newStory);
    } 
  }
  catch (err) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
  }
}

export default StoryController;