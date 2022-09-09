import LoginForm from '../components/login';
import SignupForm from '../components/signup';

export default function Login() {
  return (
    <div 
      className="
        p-6 
        flex flex-col text-center 
        gap-5
      "
    >
      <LoginForm />
      <SignupForm />
    </div>
  );
}
