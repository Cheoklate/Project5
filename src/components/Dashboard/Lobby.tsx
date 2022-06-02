import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.jsx';
import axios from 'axios';

// Generate Order Data
function data(
	id: number,
	createdAt: string,
	title: string,
	genre: string,
	value: number
) {
	return { id, createdAt, title, genre, value };
}

const rows = [data(0, '12629', 'Test', 'Action', 85386.93)];

async function getUserData() {
	try {
		const response = await axios.get('http://localhost:3004/renderLobby');
		console.log(response);
    return response
	} catch (error) {
		console.log(error);
	}
}

function preventDefault(event: { preventDefault: () => void }) {
	event.preventDefault();
}

export default function Lobby() {
	return (
		<React.Fragment>
			<Title>Open Games</Title>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Created At</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Genre</TableCell>
						<TableCell align='right'>Join Game</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.createdAt}</TableCell>
							<TableCell>{row.title}</TableCell>
							<TableCell>{row.genre}</TableCell>
							<TableCell align='right'>
								<Link>{`$${row.value}`}</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Link color='primary' href='#' onClick={getUserData} sx={{ mt: 3 }}>
				See more orders
			</Link>
		</React.Fragment>
	);
}
