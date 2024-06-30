import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import path from 'path';
import streamifier from 'streamifier';

const prisma = new PrismaClient();

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

		console.log(file)

		if (!file || !file.name) {
			return NextResponse.json(
				{ error: 'File upload failed: file is not provided' },
				{ status: 400 },
			);
		}

		const fileType = file.type;
		const validImageTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
		];

		if (!validImageTypes.includes(fileType)) {
			return NextResponse.json(
				{ error: 'Invalid file type. Only image files are allowed.' },
				{ status: 400 },
			);
		}

		const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
		if (file.size > maxFileSize) {
			return NextResponse.json(
				{ error: 'File size exceeds the 10MB limit.' },
				{ status: 400 },
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const uniqueFileName = `${uuidv4()}-${file.name}`;

		const uploadFromBuffer = (buffer) => {
			return new Promise((resolve, reject) => {
				const stream = cloudinary.v2.uploader.upload_stream(
					{
						folder: 'nfts',
						public_id: uniqueFileName,
						resource_type: 'image',
					},
					(error, result) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					},
				);
				streamifier.createReadStream(buffer).pipe(stream);
			});
		};

		const result = await uploadFromBuffer(buffer);
		

		if (!result) {
			return NextResponse.json(
				{ error: 'Failed to upload file to Cloudinary' },
				{ status: 500 },
			);
		}

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
				fileUrl: result.secure_url,
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
