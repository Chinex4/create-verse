import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(request) {
	if (request.method !== 'GET') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}
	const token = request.headers.get('authorization')?.split(' ')[1];

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;
		const nfts = await prisma.nFT.findMany({
			where: {
				ownerId: userId,
			},
		});

		if (!nfts) {
			return NextResponse.json({ error: 'NFTs not found' }, { status: 404 });
		}

		return NextResponse.json(nfts, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch NFTs', details: error.message },
			{ status: 500 },
		);
	}
}
