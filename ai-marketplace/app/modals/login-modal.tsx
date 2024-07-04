'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/auth-contex";
import { useAuthStore, useLoginModal, useRegisterModal } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { userMe } from "@/services/api";

interface Idata{
    access?: string;
    refresh?: string;
}

interface Iuser{
    username: string;
    email: string;
}

const LoginModal = () => {
  const [tokens, setTokens] = useState<Idata>({access: "", refresh: ""});
  const {login:authLogin} = useAuth();
  const {isLoginModalOpen,closeLoginModal} = useLoginModal();
  const {setUser} = useAuthStore();
  const {openRegisterModal} = useRegisterModal();
  const {clearUser,accessToken,refreshToken} = useAuthStore();


  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const data:Iuser = await userMe(accessToken);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [accessToken, setUser]);


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await authLogin(values.username, values.password);
      closeLoginModal();
    } catch (error) {
      console.error(error);
    }
  };

  const goToRegister = () => {
    closeLoginModal();
    openRegisterModal();
    clearUser();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Enter your account</DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <button onClick={goToRegister} type="button"  className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</button>
                  </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
