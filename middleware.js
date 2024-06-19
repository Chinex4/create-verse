import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(req) {
	const token =
		req.cookies.get('token') || req.headers.authorization?.split(' ')[1];

	if (!token) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_BASE_URL}/register/login`,
		);
	}

	try {
		verify(token, process.env.JWT_SECRET);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_BASE_URL}/register/login`,
		);
	}
}

export const config = {
	matcher: ['/dashboard'],
};
