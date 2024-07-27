// import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


// const prisma = new PrismaClient();


export const dynamic = 'force-dynamic';

export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	try {
		const data = await request.formData();
		const amount = data.get('amount');
		const address = data.get('address');
		const token = data.get('token');

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;

		if (!decoded) {
			return NextResponse.json(
				{ message: 'Invalid or expired token' },
				{ status: 400 },
			);
		}

		// await prisma.user.update({
		// 	where: { id: userId },
		// 	data: {
		// 		amount
		// 	},
		// });

		return NextResponse.json(
			{ message: 'An error occurred please contact ' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: `Error withdrawing from balance: ${error.message}` },
			{ status: 500 },
		);
	}
}
