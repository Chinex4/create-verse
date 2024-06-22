import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { token, password } = req.body;

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const hashedPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { email: decoded.email },
			data: { password: hashedPassword },
		});

		res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
		res.status(500).json({ error: 'Invalid or expired token' });
	}
}
