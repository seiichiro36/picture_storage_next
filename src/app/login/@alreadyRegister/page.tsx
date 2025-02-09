"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/_components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import React from "react"
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import auth, { checkUserWhetherIsExist } from "@/firebase"
import { persistentEmailAtom } from "@/basic/atom"
import { useAtom } from "jotai"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { emailAtom } from '@/basic/atom'
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

export default function ProfileForm() {
  const [persistentEmail, setPersistentEmail] = useAtom(persistentEmailAtom);
  const router = useRouter()
  const isExsitedUser = "既に登録されています"

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
    setPersistentEmail(values.email)

    handleLogin({ email: values.email, password: values.password })
  }


  const handleLogin = async ({ email, password }: LgoinUserProp) => {
    console.log(email, password);
    const result = await checkUserWhetherIsExist({ email, password })
    console.log(result.exists);
    console.log(result.message);
    if (result.exists) {
      router.push("/arts")
    } else {
      router.push("/login")
    }
  }


  return (
    <div className="bg-white-500 w-[1200px] max-w-md mx-auto">

      <Form {...form}>
        <div className='text-2xl font-bold  text-center mt-4'>ログイン</div>
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
                <FormMessage className="text-red-600" />
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
                <FormMessage className="text-red-600" />
              </FormItem>

            )}
          />
          <Button type="submit" className="block w-full text-white bg-[#3b5a9b] hover:bg-[#1e3a78]">登録</Button>
        </form>
      </Form>
    </div>

  )
}
