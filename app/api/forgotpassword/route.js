// route.js for /api/forgotpassword
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function POST(request) {
	// if (request.method !== 'POST') {
	// 	return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	// }

	try {
		const body = await request.json();
		const { email } = body;
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json({ error: 'Email not found' }, { status: 404 });
		}

		const token = jwt.sign({ email }, process.env.JWT_SECRET, {
			expiresIn: '5m',
		});

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Password Reset',
			html: `<p>You requested a password reset</p> 
                <p>Click this <a href='${process.env.NEXT_PUBLIC_BASE_URL}/createpassword?token=${token}'>link</a> to set a new password</p>`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Password reset link sent' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
