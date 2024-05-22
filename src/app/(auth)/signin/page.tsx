"use client"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


import {useRouter} from 'next/navigation'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {LoginUser} from "@/lib/utils";


const signInSchema = z.object({
    email: z.string().email({
        message: "please enter a valid email"
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }),
})

export default function SignInPage() {


    const router = useRouter();
    const signInForm = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            password: "",
            email: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signInSchema>) {
        LoginUser(values.email, values.password, router);
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...signInForm}>
                    <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={signInForm.control}
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
                                    control={signInForm.control}
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
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
