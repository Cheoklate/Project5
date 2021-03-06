import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Header(props) {
	// const SignInPage = lazy(() => import('./components/SignIn.jsx'))
	let navigate = useNavigate();
	const routeSignin = () => {
		let path = `signin`;
		navigate(path);
	};
	const routeSignup = () => {
		let path = `signup`;
		navigate(path);
	};
	const { sections, title } = props;

	return (
		<React.Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Button onClick={routeSignup} variant='outlined' size='small'>
					Signup
				</Button>
				<Typography
					component='h2'
					variant='h2'
					color='inherit'
					align='center'
					noWrap
					sx={{ flex: 1 }}
				>
					{title}
				</Typography>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<Button onClick={routeSignin} variant='outlined' size='small'>
					Sign in
				</Button>
			</Toolbar>
			<Toolbar
				component='nav'
				variant='dense'
				sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
			>
				{sections.map((section) => (
					<Link
						color='inherit'
						noWrap
						key={section.title}
						variant='body2'
						href={section.url}
						sx={{ p: 1, flexShrink: 0 }}
					>
						{section.title}
					</Link>
				))}
			</Toolbar>
		</React.Fragment>
	);
}

Header.propTypes = {
	sections: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
};

export default Header;
