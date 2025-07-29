// ============= /src/lib/auth.ts =============
import { compare, hash } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createSession(userId: string) {
  // Generate a random token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  // Set the session token in a cookie
  (await cookies()).set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    sameSite: 'lax',
  });

  return session;
}

export async function getCurrentUser() {
  const token = (await cookies()).get('auth_token')?.value;
  
  if (!token) {
    return null;
  }

  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      // Session expired
      (await cookies()).delete('auth_token');
      return null;
    }

    return session.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return user;
}

export async function logout() {
  const token = (await cookies()).get('auth_token')?.value;
  
  if (token) {
    try {
      // Delete the session from the database
      await prisma.session.delete({
        where: { token },
      });
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }
  
  // Remove the auth cookie
  (await cookies()).delete('auth_token');
}