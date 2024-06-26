import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const body = await request.json();
		const { walletAddress, token } = body;

		if (!token) {
			return NextResponse.json({ error: 'Token is required' }, { status: 400 });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return NextResponse.json(
				{ error: 'Invalid or expired token' },
				{ status: 400 },
			);
		}

		await prisma.user.update({
			where: { id: decoded.userId },
			data: { walletAddress },
		});

		return NextResponse.json(
			{ message: 'Wallet connected successfully' },
			{ status: 200 },
		);
	} catch (error) {
		// console.log('Error connecting wallet:', error);
		return NextResponse.json(
			{ error: "Failed to connect wallet!" },
			{ status: 500 },
		);
	}
}
