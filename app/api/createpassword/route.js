import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, {status: 405});
	}

	const { token, password } = request.body;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { email: decoded.email },
			data: { password: hashedPassword },
		});

		return NextResponse.json({ message: 'Password reset successful' }, {status: 200});
	} catch (error) {
		return NextResponse.json({ error: 'Invalid or expired token' }, {status: 500});
	}
}
