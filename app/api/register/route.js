import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const body = await request.json();
		const { username, firstName, lastName, email, password, confirmPassword } =
			body;

		// Validate passwords match
		if (password !== confirmPassword) {
			return NextResponse.json(
				{ error: 'Passwords do not match' },
				{ status: 400 },
			);
		}

		// Check if user with the same email already exists
		const existingUserByEmail = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUserByEmail) {
			return NextResponse.json(
				{ error: 'User with this email already exists' },
				{ status: 400 },
			);
		}

		const existingUserByUsername = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (existingUserByUsername) {
			return NextResponse.json(
				{ error: 'Username already exists' },
				{ status: 400 },
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user in the database
		const newUser = await prisma.user.create({
			data: {
				username,
				firstName,
				lastName,
				email,
				password: hashedPassword,
			},
		});

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json(
			{ error: 'User creation failed', details: error.message },
			{ status: 500 },
		);
	} 
	
}
