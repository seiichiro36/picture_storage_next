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
import auth, { checkUserWhetherIsExist } from "@/firebase"
import { displayNameAtom } from "@/basic/atom"
import { useAtom } from "jotai"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function ProfileForm({ className }: LoginFormProps) {

  const router = useRouter()

  const [displayname, setDisplayName] = useAtom(displayNameAtom)
  const [email, setEmail] = useAtom(displayNameAtom)
  const [passwored, setPassword] = useAtom(displayNameAtom)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values.email, values.password);
    
    router.push("/register")
    // handleLogin({ email: values.email, password: values.password })
  }

  const handleLogin = async ({ email, password }: LgoinUserProp) => {
    console.log(email, password);
    const result = await checkUserWhetherIsExist({ email, password })
    console.log(result.message);
  }


  return (
    <div>
        <Button type="submit" className="block w-full bg-white text-black mt-20">Googleで認証する</Button>
    </div>
  )
}
