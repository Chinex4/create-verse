import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	const form = new formidable.IncomingForm();
	form.uploadDir = './public/uploads';
	form.keepExtensions = true;

	form.parse(request, async (err, fields, files) => {
		if (err) {
			return NextResponse.json(
				{ error: 'Error parsing form data' },
				{ status: 500 },
			);
		}

		const { price, name, description, royalties, token } = fields;

		const file = files.file;

		if (!file) {
			return NextResponse.json(
				{ error: 'File upload failed' },
				{ status: 400 },
			);
		}

		const filePath = path.join('./public/uploads', path.basename(file.path));

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const userId = decoded.userId;

			if (!decoded) {
				return NextResponse.json(
					{ error: 'Invalid or expired token' },
					{ status: 400 },
				);
			}

			const nft = await prisma.nft.create({
				data: {
					fileUrl: filePath,
					price: parseFloat(price),
					name,
					description,
					royalties: parseFloat(royalties),
					ownerId: userId,
				},
			});

			return NextResponse.json(
				{ message: 'NFT created successfully', nft },
				{ status: 200 },
			);
		} catch (error) {
			// console.log('Error connecting wallet:', error);
			return NextResponse.json(
				{ error: `Error creating NFT: ${error.message}` },
				{ status: 500 },
			);
		}
	});
}