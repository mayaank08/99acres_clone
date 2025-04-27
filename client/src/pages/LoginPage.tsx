import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LoginInput } from "@/lib/types";
import { Link } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await apiRequest("POST", "/api/login", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome back to 99acres Clone!",
      });
      navigate("/");
    },
    onError: (error: any) => {
      setError(error.message || "Invalid username or password");
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Login | 99acres Clone</title>
        <meta name="description" content="Login to your 99acres Clone account to access your saved properties, post new listings, and more." />
      </Helmet>
      
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Login to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
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
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-red-700"
                  disabled={isPending}
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/signup">
                <a className="text-primary hover:underline">Sign Up</a>
              </Link>
            </div>
            <Link href="/forgot-password">
              <a className="text-sm text-primary hover:underline text-center">
                Forgot Password?
              </a>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
