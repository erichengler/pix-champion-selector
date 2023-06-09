import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
	
	const history = useHistory();

	return (
		<div>
			<LoginForm />

			<center>
				New User?
				<br />
				<button
					type="button"
					className="btn btn_asLink"
					onClick={() => {
						history.push('/registration');
					}}
				>
					Register
				</button>
			</center>
		</div>
	);
}

export default LoginPage;
