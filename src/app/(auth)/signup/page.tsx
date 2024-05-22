"use client"

import {z} from "zod"


import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {useRouter} from 'next/navigation'
import {RegisterUser} from "@/lib/utils";


const signUpSchema = z.object({
    email: z.string().email({
        message: "please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }),
})

export default function SignUpPage() {

    const router = useRouter();
    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            password: "",
            email: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        RegisterUser(values.email, values.password, router)
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your email below to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={signUpForm.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    id="passowd"
                                                    type="password"
                                                    required
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/signin" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
