import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function RegisterPage() {

	const history = useHistory();

	return (
		<div>
			<RegisterForm />

			<center>
				Already Registered?
				<br />
				<button
					type="button"
					className="btn btn_asLink"
					onClick={() => {
						history.push('/login');
					}}
				>
					Login
				</button>
			</center>
		</div>
	);
}

export default RegisterPage;
