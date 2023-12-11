import { signIn } from '@/apis/auth';
import bgAuth from '@/assets/images/bg-auth.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/lib/shema';
import { getToken, setToken } from '@/lib/storage';
import { Link } from '@/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import * as z from 'zod';


export function Loader() {
  const isAuth = getToken();
  if (isAuth) {
    return redirect('/orgs');
  }
  return null;
}

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'admin@enouvo.com',
      password: 'Enouvo@123',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const res = await signIn(email, password);
      setToken(res.data.accessToken);
      navigate("/channels");
    } catch (error) {
      if(error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen relative w-full">
      <img src={bgAuth} className="w-full h-full object-cover" />
      <div className="p-2 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl md:max-w-3xl">
        <div className="w-full p-8 flex gap-20 bg-gray-800 rounded-sm text-white">
          <div className="w-full">
            <Link to="/" className="inline-flex mb-4">
              <ChevronLeft /> Go back
            </Link>
            <h1 className="font-bold text-2xl text-center">Welcome back!</h1>
            <p className="mb-4 text-center"> We're excited to see you again !</p>
            <form className="text-start mt-5" onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Email Or Phone Number" className="bg-gray-200 text-black" {...register('email')} />
              {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
              <Input
                placeholder="Password"
                type="password"
                className="mt-6 bg-gray-200  text-black"
                {...register('password')}
              />
              {errors.password && <p className="my-1 text-red-500">{errors.password.message}</p>}
              <p className="text-sky-500 text-xs text-start cursor-pointer my-1">Forgot Password?</p>
              <Button className="w-full mt-4 mb-3" type="submit" loading={isLoading}>
                Login
              </Button>
              <p className="text-xs">
                {' '}
                Need an account?{' '}
                <Link to="/register" className="text-sky-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden md:flex items-center flex-col justify-center">
            <div> QR Code </div>
            <h2 className="text-center text-xl font-bold"> Log in with QR Code</h2>
            <p className="text-center text-neutral-300 text-sm">
              Scan this with the <strong>Discord mobile app</strong> to log in instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
