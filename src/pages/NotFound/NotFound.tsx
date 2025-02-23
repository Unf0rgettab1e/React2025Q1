import { useNavigate } from 'react-router';
import Button from '~/components/ui/Button/Button';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
      <div className="text-rose-700 font-extrabold text-9xl sm:text-[12rem] lg:text-[16rem] animate-pulse">404</div>

      <div className="space-y-4 text-center font-poppins">
        <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">Oops! Page Not Found</h1>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>

      <div className="absolute inset-0 z-[-1]">
        <div className="absolute w-[200px] h-[200px] bg-red-800 rounded-full blur-3xl opacity-50 top-10 left-10"></div>
        <div className="absolute w-[180px] h-[180px] bg-yellow-500 rounded-full blur-3xl opacity-40 bottom-10 right-10"></div>
      </div>
    </div>
  );
}

export default NotFoundPage;
