import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import React from 'react'

const AuthPage = async ({ params }: { params: { type: string } }) => {
    const { type } = await params;
    return (
        <div>
            {type === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
    )
}

export default AuthPage