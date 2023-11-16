import bgAuth from '@/assets/images/bg-auth.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setToken } from '@/lib/storage';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginSchema } from '@/lib/shema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { signIn } from '@/apis/auth';

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
      navigate('/orgs');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen relative w-full">
      <img src={bgAuth} className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1/3 -translate-y-1/2 bg-background text-center  p-8 rounded-sm text-primary-foreground">
        <h1 className="font-bold text-2xl">Welcome back!</h1>
        <p className="mb-4"> We're excited to see you again !</p>
        <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Email Or Phone Number" {...register('email')} />
          {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
          <Input placeholder="Password" type="password" className="mt-6" {...register('password')} />
          {errors.password && <p className="mt-1 text-red-500">{errors.password.message}</p>}
          <Button className="w-full mt-6" type="submit" loading={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}