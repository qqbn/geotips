import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        return NextResponse.json({ 
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Auth verification error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 