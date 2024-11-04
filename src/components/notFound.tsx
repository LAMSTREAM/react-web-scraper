import { useNavigate } from 'react-router-dom';
import {Button} from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Oops! The page you are looking for does not exist.
      </p>
      <Button onClick={handleGoHome} className="mt-4">
        Go Back to Home
      </Button>
    </div>
  );
}
