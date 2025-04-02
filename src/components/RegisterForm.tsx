'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
    firstname: z.string().min(2, { message: "Firstname must be at least 2 characters.", }),
    lastname: z.string().min(2, { message: "Lastname must be at least 2 characters.", }),
    email: z
        .string()
        .min(4, { message: "Email must be at least 4 characters.", })
        .email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters.", }),
})

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ values }),
            });

            console.log(response);
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || 'Nieprawidłowy email lub hasło');
            }

            // Login successful, redirect to dashboard
            router.push('/dashboard');
            // router.refresh(); // Refresh server components
        } catch (error) {
            console.error('Login error:', error);
            setError(error instanceof Error ? error.message : 'Wystąpił błąd podczas logowania');
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        // Check if user just registered
        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
        }
    }, [searchParams]);


    return (
        <Card className=' mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mx-auto max-w-[600px]'>
            <CardHeader>
                <CardTitle>SignUp to GeoTips</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Firstname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Firstname" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lastname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Lastname" {...field} />
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
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-mail" {...field} />
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
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Register</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>Already have an account? <Link href="/auth/login" className='text-cyan-500'>Login</Link></p>
            </CardFooter>
        </Card>
    )
}

export default RegisterForm