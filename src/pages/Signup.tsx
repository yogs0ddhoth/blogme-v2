import AuthForm from '../components/Forms/AuthForm';
import useControllers from '../utils/api';

export default function Signup() {
  const { signup } = useControllers();
  const useSignup = signup.init();
  
  return (
    <div 
      className="
        p-6 
        flex flex-col text-center 
        gap-5
      "
    >
      <AuthForm variant='Signup' mutation={useSignup} />
    </div>
  );
}