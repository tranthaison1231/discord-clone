import { resetPassword } from "@/apis/auth";
import bgAuth from "@/assets/images/bg-auth.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/lib/shema";
import { getToken } from "@/lib/storage";
import { Link, useNavigate } from "@/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

export function Loader() {
  const isAuth = getToken();
  if (isAuth) {
    return redirect("/orgs");
  }
  return null;
}

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ResetPasswordSchema>> = async ({
    password,
  }) => {
    try {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Unable to reset password. Please try again later");
        return;
      }
      setIsLoading(true);
      await resetPassword(token, password);
      navigate("/login");
      toast.success(
        "Your password has been reset. Please login with your new password.",
      );
    } catch (error) {
      if (error instanceof AxiosError) {
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
            <h1 className="font-bold text-2xl text-center">Reset Password</h1>
            <form className="text-start mt-5" onSubmit={handleSubmit(onSubmit)}>
              <Input
                type="password"
                placeholder="Password"
                className="bg-gray-200 text-black"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-red-500">{errors.password.message}</p>
              )}
              <Button
                className="w-full mt-4 mb-3"
                type="submit"
                loading={isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
