import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(request) {
	try {
		// Parse multipart form data
		const data = await request.formData();
		const file = data.get('file');
		const price = data.get('price');
		const name = data.get('name');
		const description = data.get('description');
		const royalties = data.get('royalties');
		const token = data.get('token');

		if (!file || !file.name) {
			return NextResponse.json(
				{ error: 'File upload failed: file is not true' },
				{ status: 400 },
			);
		}

		const uniqueFileName = `${uuidv4()}-${file.name}`;
		const filePath = path.join(
			process.cwd(),
			'public',
			'uploads',
			uniqueFileName,
		);

		// Save the file to the specified path
		const buffer = Buffer.from(await file.arrayBuffer());
		fs.writeFileSync(filePath, buffer);

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;

		if (!decoded) {
			return NextResponse.json(
				{ error: 'Invalid or expired token' },
				{ status: 400 },
			);
		}

		const nft = await prisma.nFT.create({
			data: {
				fileUrl: `/uploads/${uniqueFileName}`,
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
		return NextResponse.json(
			{ error: `Error creating NFT: ${error.message}` },
			{ status: 500 },
		);
	}
}
// https://3458zz5t-3000.uks1.devtunnels.ms/