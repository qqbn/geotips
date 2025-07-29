'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';

interface User {
    id: string;
    email: string;
    createdAt?: Date;
}

interface DashboardClientProps {
    user: User;
}

export const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
    const [loaded, setLoaded] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="p-6">
            <h1>Loaded: {loaded.toString()}</h1>
            <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
            <h2>Counter: {counter}</h2>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-4">Witaj, {user.email}!</p>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Twoje statystyki</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800">Quizy ukończone</h3>
                        <p className="text-2xl font-bold text-blue-600">0</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-medium text-green-800">Punkty</h3>
                        <p className="text-2xl font-bold text-green-600">0</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-medium text-purple-800">Poziom</h3>
                        <p className="text-2xl font-bold text-purple-600">1</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 