'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div>
            <h1>Loaded: {loaded.toString()}</h1>
            <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
            <h2>Counter: {counter}</h2>
        </div>
    )
}

export default DashboardPage;