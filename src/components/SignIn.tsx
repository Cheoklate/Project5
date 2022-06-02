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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CommonProps } from '@mui/material/OverridableComponent';
import { SystemProps } from '@mui/system';

axios.defaults.withCredentials = true;

function Copyright(
	props: JSX.IntrinsicAttributes & {
		component: React.ElementType<any>;
	} & SystemProps<Theme> & {
			align?: 'inherit' | 'left' | 'right' | 'center' | 'justify' | undefined;
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
			| 'children'
			| 'sx'
			| 'variant'
			| 'align'
			| (
					| 'p'
					| 'color'
					| 'border'
					| 'boxShadow'
					| 'fontWeight'
					| 'zIndex'
					| 'alignContent'
					| 'alignItems'
					| 'alignSelf'
					| 'bottom'
					| 'boxSizing'
					| 'columnGap'
					| 'display'
					| 'flexBasis'
					| 'flexDirection'
					| 'flexGrow'
					| 'flexShrink'
					| 'flexWrap'
					| 'fontFamily'
					| 'fontSize'
					| 'fontStyle'
					| 'gridAutoColumns'
					| 'gridAutoFlow'
					| 'gridAutoRows'
					| 'gridTemplateAreas'
					| 'gridTemplateColumns'
					| 'gridTemplateRows'
					| 'height'
					| 'justifyContent'
					| 'justifyItems'
					| 'justifySelf'
					| 'left'
					| 'letterSpacing'
					| 'lineHeight'
					| 'marginBottom'
					| 'marginLeft'
					| 'marginRight'
					| 'marginTop'
					| 'maxHeight'
					| 'maxWidth'
					| 'minHeight'
					| 'minWidth'
					| 'order'
					| 'paddingBottom'
					| 'paddingLeft'
					| 'paddingRight'
					| 'paddingTop'
					| 'position'
					| 'right'
					| 'rowGap'
					| 'textAlign'
					| 'textOverflow'
					| 'textTransform'
					| 'top'
					| 'visibility'
					| 'whiteSpace'
					| 'width'
					| 'borderBottom'
					| 'borderColor'
					| 'borderLeft'
					| 'borderRadius'
					| 'borderRight'
					| 'borderTop'
					| 'flex'
					| 'gap'
					| 'gridArea'
					| 'gridColumn'
					| 'gridRow'
					| 'margin'
					| 'overflow'
					| 'padding'
					| 'bgcolor'
					| 'm'
					| 'mt'
					| 'mr'
					| 'mb'
					| 'ml'
					| 'mx'
					| 'marginX'
					| 'my'
					| 'marginY'
					| 'pt'
					| 'pr'
					| 'pb'
					| 'pl'
					| 'px'
					| 'paddingX'
					| 'py'
					| 'paddingY'
					| 'typography'
					| 'displayPrint'
			  )
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
				Shtory Time
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (event: {
		preventDefault: () => void;
		currentTarget: HTMLFormElement | undefined;
	}) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let loginDetails = { email: email, password: password };
		axios
			.post('http://localhost:3004/login', loginDetails)
			.then((res) => {
				let path = '/dashboard';
				console.log('succesful login');
				console.log('data', res.data);
				const { id, email } = res.data;
				navigate(path);
			})
			.catch((error) => {
				console.log('login failed');
				console.log('error', error);
			});
		console.log({
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
						Sign in
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='./signup' variant='body2'>
									{"Don't have an account? Sign Up"}
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
