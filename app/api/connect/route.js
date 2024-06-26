import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	try {
		const body = await request.json();
		const { walletAddress, token } = body;

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return NextResponse.json(
				{ message: 'Invalid or expired token' },
				{ status: 400 },
			);
		}

		await prisma.user.update({
			where: { email: decoded.email },
			data: { walletAddress },
		});

		return NextResponse.json(
			{ message: 'Wallet connected successfully' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid or expired token' },
			{ status: 500 },
		);
	}
}
