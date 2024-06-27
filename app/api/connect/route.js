import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const ethWallets = [
	'0x002Ef8f7919Bb14CE35D1eC05A88dA5EB81924A2',
	'0xd08835002097a03bA41cFC20498aB826A5FB7c06',
	'0x536995e02ae5bc54693ddb881c97282b3abc433f',
	'0x77982e632b1690854cfb5408c1c804db1f50b42d',
	'0x5A088e904A9f5325bf0dE7222579b9626DFd5085',
	'0x6D48Cf942AF0Dd0b3603ebE680BaFaC9432419C7',
	'0x64B136415EDeB281BC7397f2F3DC4f71D33469bD'
];

export async function POST(request) {
	try {
		const body = await request.json();
		const { token } = body;

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

		// const existingUser = await prisma.user.findUnique({
		// 	where: { walletAddress },
		// });

		// if (existingUser) {
		// 	return NextResponse.json(
		// 		{ error: 'Wallet address already exists' },
		// 		{ status: 400 },
		// 	);
		// }

		const randomWalletAddress =
			ethWallets[Math.floor(Math.random() * ethWallets.length)];


		await prisma.user.update({
			where: { id: decoded.userId },
			data: { walletAddress: randomWalletAddress },
		});

		return NextResponse.json(
			{ message: 'Wallet connected successfully' },
			{ status: 200 },
		);
	} catch (error) {
		// console.log('Error connecting wallet:', error);
		return NextResponse.json(
			{ error: 'Failed to connect wallet!' },
			{ status: 500 },
		);
	}
}
