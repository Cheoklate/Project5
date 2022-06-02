import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
	createTheme,
	SxProps,
	Theme,
	ThemeProvider,
} from '@mui/material/styles';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(
	props: JSX.IntrinsicAttributes & {
		component: React.ElementType<any>;
	} & SystemProps<Theme> & {
			align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
			children?: React.ReactNode;
			classes?: Partial<TypographyClasses> | undefined;
			gutterBottom?: boolean | undefined;
			noWrap?: boolean | undefined;
			paragraph?: boolean | undefined;
			sx?: SxProps<Theme> | undefined;
			variant?:
				| 'button'
				| 'caption'
				| 'h1'
				| 'h2'
				| 'h3'
				| 'h4'
				| 'h5'
				| 'h6'
				| 'inherit'
				| 'subtitle1'
				| 'subtitle2'
				| 'body1'
				| 'body2'
				| 'overline'
				| undefined;
			variantMapping?:
				| Partial<
						Record<
							| 'button'
							| 'caption'
							| 'h1'
							| 'h2'
							| 'h3'
							| 'h4'
							| 'h5'
							| 'h6'
							| 'inherit'
							| 'subtitle1'
							| 'subtitle2'
							| 'body1'
							| 'body2'
							| 'overline',
							string
						>
				  >
				| undefined;
		} & CommonProps &
		Omit<
			any,
			| keyof CommonProps
			| (
					| 'border'
					| 'borderTop'
					| 'borderRight'
					| 'borderBottom'
					| 'borderLeft'
					| 'borderColor'
					| 'borderRadius'
					| 'display'
					| 'displayPrint'
					| 'overflow'
					| 'textOverflow'
					| 'visibility'
					| 'whiteSpace'
					| 'flexBasis'
					| 'flexDirection'
					| 'flexWrap'
					| 'justifyContent'
					| 'alignItems'
					| 'alignContent'
					| 'order'
					| 'flex'
					| 'flexGrow'
					| 'flexShrink'
					| 'alignSelf'
					| 'justifyItems'
					| 'justifySelf'
					| 'gap'
					| 'columnGap'
					| 'rowGap'
					| 'gridColumn'
					| 'gridRow'
					| 'gridAutoFlow'
					| 'gridAutoColumns'
					| 'gridAutoRows'
					| 'gridTemplateColumns'
					| 'gridTemplateRows'
					| 'gridTemplateAreas'
					| 'gridArea'
					| 'bgcolor'
					| 'color'
					| 'zIndex'
					| 'position'
					| 'top'
					| 'right'
					| 'bottom'
					| 'left'
					| 'boxShadow'
					| 'width'
					| 'maxWidth'
					| 'minWidth'
					| 'height'
					| 'maxHeight'
					| 'minHeight'
					| 'boxSizing'
					| 'm'
					| 'mt'
					| 'mr'
					| 'mb'
					| 'ml'
					| 'mx'
					| 'my'
					| 'p'
					| 'pt'
					| 'pr'
					| 'pb'
					| 'pl'
					| 'px'
					| 'py'
					| 'margin'
					| 'marginTop'
					| 'marginRight'
					| 'marginBottom'
					| 'marginLeft'
					| 'marginX'
					| 'marginY'
					| 'padding'
					| 'paddingTop'
					| 'paddingRight'
					| 'paddingBottom'
					| 'paddingLeft'
					| 'paddingX'
					| 'paddingY'
					| 'typography'
					| 'fontFamily'
					| 'fontSize'
					| 'fontStyle'
					| 'fontWeight'
					| 'letterSpacing'
					| 'lineHeight'
					| 'textAlign'
					| 'textTransform'
			  )
			| 'children'
			| 'sx'
			| 'align'
			| 'variant'
			| 'gutterBottom'
			| 'noWrap'
			| 'paragraph'
			| 'variantMapping'
		>
) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				Main Page
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [userName, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (event: {
		preventDefault: () => void;
		currentTarget: HTMLFormElement | undefined;
	}) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let signupDetails = {
			userName: userName,
			email: email,
			password: password,
		};
		axios
			.post('http://localhost:3004/signup', signupDetails)
			.then((res) => {
				let path = '/signin';
				console.log('succesful signup');
				console.log('data', res.data);
				const { id, email } = res.data;
				navigate(path);
			})
			.catch((error) => {
				console.log('signup failed');
				console.log('error', error);
			});
		console.log({
			userName: data.get('userName'),
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete='username'
									name='userName'
									required
									fullWidth
									id='userName'
									label='Username'
									autoFocus
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</Grid>
							{/* <Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
								/>
							</Grid> */}
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									onChange={(event) => {
										setEmail(event.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
									onChange={(event) => {
										setPassword(event.target.value);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value='allowExtraEmails' color='primary' />
									}
									label='I want to receive inspiration, marketing promotions and updates via email.'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='signin' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Typography variant='body2' color='text.secondary' align='center'>
					<Copyright sx={{ mt: 8, mb: 4 }} component={'symbol'} />
				</Typography>
			</Container>
		</ThemeProvider>
	);
}
