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
import { registerSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/auth-contex";
import { useLoginModal, useRegisterModal } from "@/stores/auth-store";
import { useAuthStore } from '../../stores/auth-store';
import toast from "react-hot-toast";
import axios from "axios";

const RegisterModal = () => {
  const { register: authRegister } = useAuth();
  const { setUser } = useAuthStore();
  const { isRegisterModalOpen, closeRegisterModal } = useRegisterModal();
  const { openLoginModal } = useLoginModal();

  const onClose = () => {
    console.log("close register modal");
    closeRegisterModal();
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const goToLogin = () => {
    closeRegisterModal();
    openLoginModal();
  };

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await authRegister(values.username, values.email, values.password);
      setUser({ username: values.username, email: values.email });
      onClose();
      openLoginModal();
      toast.success("Registered successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMsg = error.response.data;
        for (const [key, value] of Object.entries(errorMsg)) {
          toast.error(`${key}: ${value}`);
        }
      } else {
        toast.error("Failed to register. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <Dialog open={isRegisterModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Please register to use the website.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="neuromark@example.com" {...field} />
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
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account <button type="button" onClick={goToLogin} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</button>
              </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
