import LoginForm from '../components/login';
import SignupForm from '../components/signup';

export default function Login() {
  return (
    <div className="page">
      <LoginForm />
      <SignupForm />
    </div>
  );
}
