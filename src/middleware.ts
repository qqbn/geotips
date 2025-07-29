import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    try {
        console.error('🔒 [Middleware] Executing for path:', request.nextUrl.pathname);
        // Pobierz token z ciasteczka
        const token = request.cookies.get('auth_token')?.value;
        
        // Pobierz ścieżkę z URL
        const { pathname } = request.nextUrl;
        
        // Określ publiczne ścieżki (niewymagające logowania)
        const publicPaths = ['/auth', '/api/auth', '/about'];
        const isPublicPath = publicPaths.some((path: string) => pathname.startsWith(path));
        
        // Jeśli to publiczna ścieżka, zezwól na dostęp
        if (isPublicPath) {
            return NextResponse.next();
        }
        
        // Jeśli to API (poza publicznymi ścieżkami), zwróć błąd 401 dla nieuwierzytelnionych
        if (pathname.startsWith('/api') && !token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Sprawdź czy użytkownik próbuje dostać się do chronionych ścieżek bez tokena
        const protectedPaths = ['/dashboard', '/account'];
        const isProtectedPath = protectedPaths.some((path: string) => pathname.startsWith(path));
        
        if (isProtectedPath && !token) {
            const loginUrl = new URL('/auth/login', request.url);
            // loginUrl.searchParams.set('redirect_to', pathname);
            return NextResponse.redirect(loginUrl);
        }
        
        // Dla pozostałych ścieżek, przekieruj do logowania jeśli brak tokena
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth/login';
            // Zapisz oryginalny URL jako parametr redirect_to
            // url.searchParams.set('redirect_to', pathname);
            return NextResponse.redirect(url);
        }
        
        // Token istnieje, zezwól na dostęp
        return NextResponse.next();
    } catch (error) {
        console.error('🔒 [Middleware] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Zastosuj middleware tylko do określonych ścieżek
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/account/:path*',
  ],
};