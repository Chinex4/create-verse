import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request) {
	const token = request.headers.get('authorization')?.split(' ')[1];

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.userId,
			},
			select: {
				username: true,
				firstName: true,
				lastName: true,
				walletAddress: true,
				email: true,
				profilePicture: true
			},
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Unauthorized', details: error.message },
			{ status: 401 },
		);
	}
}
