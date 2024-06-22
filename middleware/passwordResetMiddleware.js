// middleware/passwordResetMiddleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function passwordResetMiddleware(req) {
	const url = req.nextUrl;
	const token = url.searchParams.get('token');

	if (!token) {
		return NextResponse.redirect('/register/login');
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect('/register/login');
	}
}

export const config = {
	matcher: ['/register/createpassword'],
};
