"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/_components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import React from "react"
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import auth, {checkUserWhetherIsExist} from "@/firebase"
import { displayNameAtom } from "@/basic/atom"
import { useAtom } from "jotai"
import Link from "next/link"
import { useRouter} from "next/navigation"

import { LgoinUserProp } from "@/_Props/Login"

const formSchema = z.object({
  email: z
  .string()
  .email({ message: "Invalid email format. Please provide a valid email address." })
  .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(20, { message: "Password must not exceed 20 characters." })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
    .regex(/\d/, { message: "Password must include at least one number." })
    .regex(/[@$!%*?&]/, { message: "Password must include at least one special character (@$!%*?&)." }),
});

interface LoginFormProps {
  className?: string
}

export default function ProfileForm({className}: LoginFormProps){

  const router = useRouter()

  const [displayname, setDisplayName] = useAtom(displayNameAtom)
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values.email, values.password);
    // console.log('Form values:', values); // 値を確認
    
    handleLogin({email: values.email, password: values.password})
  }

  async function signInWithGoogle() {
    try {
      console.log("Starting Google Sign in");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const user = result.user;

      console.log("Sign in successful: ", user);

      console.log(user.displayName);
      console.log("uid：", user.uid);
      


      setDisplayName(user.displayName)
      

      console.log("User data saved successfully");

    } catch (error) {
      console.error("Sign in Failed:", error);      
    }

  }

  const handleLogin = async ({email, password}: LgoinUserProp) => {
    console.log(email, password);
    const result = await checkUserWhetherIsExist({email, password})
    console.log(result.message);
    
  }

  
  return (
    <div className="bg-white-500 w-[1200px] max-w-md mx-auto">
    <Form {...form}>
    <div className='text-2xl font-bold  text-center mb-4'>ログイン</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="hogehoge@hoge.hoge" {...field} />
              </FormControl>
              <FormDescription>
              {/* Please enter your email address for new registration */}
              登録済の場合はこちら入力してください
              </FormDescription>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input placeholder="HogehogE" {...field} />
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
            
          )}
        />
        <Button type="submit" className="block w-full text-white">Submit</Button>
        </form>
        </Form>
    </div>

  )
}
