"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import auth from "@/firebase"
import { displayNameAtom } from "@/basic/atom"
import { useAtom } from "jotai"
import Link from "next/link"
import { useRouter} from "next/navigation"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

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
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  async function signInWithGoogle() {
    try {
      console.log("Starting Google Sign in");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const user = result.user;
  
      console.log("Sign in successful: ", user);

      console.log(user.displayName);


      setDisplayName(user.displayName)
      

      console.log("User data saved successfully");
      
      router.push("/posts")

    } catch (error) {
      console.error("Sign in Failed:", error);


      
    }

    
    
  }

  
  return (
    <div className="bg-white-500 border  w-[1200px] px-10 pt-5 pb-5 max-w-md mx-auto">
    <Form {...form}>
        <div className='text-2xl font-bold  text-center'>Sign Up or Log In</div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit" className="flex">Submit</Button>
        </form>
        </Form>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit" className="flex">Submit</Button>
        </form>
        </Form>
        <div>
        <Button className="w-full h-10 my-5 select-none bg-white text-black hover:bg-gray-300" onClick={signInWithGoogle}>
          <p>Googleアカウントでログイン</p>
        </Button>
        </div>
        <div>
        <Button className="w-full h-10 select-none" onClick={() => console.log("ログインボタン押下")}>Githubアカウントでログイン</Button>
        </div>
    </div>

  )
}
