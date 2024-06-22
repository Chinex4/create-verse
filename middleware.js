// middleware.js
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { passwordResetMiddleware } from './middleware/passwordResetMiddleware';

export function middleware(req) {
	const url = req.nextUrl;
	const token =
		req.cookies.get('token') || req.headers.authorization?.split(' ')[1];

	if (url.pathname.startsWith('/dashboard')) {
		if (!token) {
			return NextResponse.redirect('/register/login');
		}

		try {
			verify(token, process.env.JWT_SECRET);
			return NextResponse.next();
		} catch (error) {
			return NextResponse.redirect('/register/login');
		}
	}

	if (url.pathname.startsWith('/register/createpassword')) {
		return passwordResetMiddleware(req);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboar', '/createpassword'],
};
