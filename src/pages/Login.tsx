import { Link } from 'react-router-dom';

import AuthForm from '../components/Forms/AuthForm';
import useControllers from '../utils/api';

export default function Login() {
  const { login } = useControllers();
  const useLogin = login.init();

  return (
    <div
      className="
        p-6 
        flex flex-col text-center 
        gap-5
      "
    >
      <AuthForm variant="Login" mutation={useLogin} />
      <Link to="/signup" className="">
        signup instead
      </Link>
    </div>
  );
}
