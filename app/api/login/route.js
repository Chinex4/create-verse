import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const body = await request.json();
		const { username, password } = body;

		// Find user by username
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid username or password' },
				{ status: 400 },
			);
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ error: 'Invalid username or password' },
				{ status: 400 },
			);
		}

		// Create JWT token
		const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		return NextResponse.json({ token }, { status: 200 });
	} catch (error) {
		console.error('Error logging in user:', error);
		return NextResponse.json(
			{ error: 'Login failed', details: error.message },
			{ status: 500 },
		);
	}
}
