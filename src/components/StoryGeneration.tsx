import React, { useState, useCallback } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import 'regenerator-runtime/runtime';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

// import dotenv from 'dotenv';
// dotenv.config();

const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Create program component that takes in input and returns generated story
let quill: Quill;
let editor;

export default function StoryGenerator() {
	const [inputPassage, setInput] = useState('');
	const [apiResponse, setResponse] = useState('');
	const [inputGenre, setGenre] = useState('');
	const [clickedButton, setClickedButton] = useState('');

	const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
    const submitPrompt = async () => {
      const response: any = await openai.createCompletion('text-davinci-002', {
        prompt: `I am a highly creative writer given the title of a story and a genre that you like, I shall generate a long form story with a named character. \n\n\n \nTitle: ${inputPassage} Genre: ${inputGenre} \n\n\n\n`,
        temperature: 1,
        max_tokens: 1037,
        top_p: 1,
        best_of: 2,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      console.log(response.data.choices[0].text);
      setResponse(response.data.choices[0].text);
    };

		const button: HTMLButtonElement = event.currentTarget;
		setClickedButton(button.name);
    submitPrompt()
	};

	const retrieveInput = (event: { target: { value: any } }) => {
		const newInput = event.target.value;
		setInput(newInput);
	};

	const retrieveGenre = (event: { target: { value: any } }) => {
		const newGenre = event.target.value;
		setGenre(newGenre);
	};

	const wrapperRef = useCallback(
		(
			wrapper: {
				innerHTML: string;
				append: (arg0: HTMLDivElement) => void;
			} | null
		) => {
			if (wrapper == null) return;
			wrapper.innerHTML = '';
			editor = document.createElement('div');
			wrapper.append(editor);
			quill = new Quill(editor, {
				theme: 'snow',
				placeholder: 'Generate a story...',
			});
			quill.insertText(0, apiResponse);
		},
		[apiResponse]
	);

	const retrieveQuill = () => {
		var text = quill.getText(0);
		console.log('quill internal', text);
		console.log('prompt', inputPassage);
		const retrieveID = localStorage.getItem('userId');
		console.log(retrieveID);
		const data = {
			title: inputPassage,
			story: text,
			user_id: retrieveID,
		};
		// axios.post("/save", data).then((response) => {
		//   if (response.data.success === true) {
		//     console.log("StorySaved");
		//   }
		// });
	};

	return (
		<div>
			<span className='mb-3'>
				<span>
					<label className='form-label'>Enter story title here:</label>
					<input
						id='inputPrompt'
						aria-describedby='passwordHelpBlock'
						type='text'
						value={inputPassage}
						onChange={retrieveInput}
					/>
					<label className='form-label'>Enter genre here:</label>
					<input
						id='genrePrompt'
						aria-describedby='passwordHelpBlock'
						type='text'
						value={inputGenre}
						onChange={retrieveGenre}
					/>
				</span>
				<br />
				<br />

				<li>Multiple genres can be seperated by commas.</li>

				<br />

				<li>
					{' '}
					Stories can be generated with a statement i.e "There was a wandering
					adventurer..."
				</li>
			</span>
			<br />
			<br />
			<button className='btn' type='submit' onClick={buttonHandler}>
				Submit prompt
			</button>

			<span ref={wrapperRef}>{''}</span>
			<button className='btn' type='submit' onClick={retrieveQuill}>
				Save
			</button>
		</div>
	);
}

function _req(_req: any, res: any) {
  throw new Error('Function not implemented.');
}
// curl https://api.openai.com/v1/engines/text-davinci-002/completions \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer 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" \
// -d '{"prompt": "Say this is a test", "temperature": 0, "max_tokens": 6}'