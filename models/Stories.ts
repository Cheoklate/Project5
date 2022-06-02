import { Schema, model } from 'mongoose';

const storiesSchema: Schema = new Schema(
	{ 
		title: String,
		content: String,
		genre: String,
	},

	{ timestamps: true }
);

export default model('Story', storiesSchema);
