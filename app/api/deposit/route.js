import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

const prisma = new PrismaClient();

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	try {
		const data = await request.formData();
		const amount = data.get('amount');
		const file = data.get('file');
		const token = data.get('token');

		if (!file || !file.name) {
			return NextResponse.json(
				{ error: 'File upload failed: Please provide a proof of payment' },
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

		const maxFileSize = 2 * 1024 * 1024; // 10MB in bytes
		if (file.size > maxFileSize) {
			return NextResponse.json(
				{ error: 'File size exceeds the 2MB limit.' },
				{ status: 400 },
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const uniqueFileName = `${uuidv4()}-${file.name}`;

		const uploadFromBuffer = (buffer) => {
			return new Promise((resolve, reject) => {
				const stream = cloudinary.v2.uploader.upload_stream(
					{
						folder: 'proofs',
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
				{ error: 'Failed to upload file to the Cloud' },
				{ status: 500 },
			);
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.userId;

		if (!decoded) {
			return NextResponse.json(
				{ message: 'Invalid or expired token' },
				{ status: 400 },
			);
		}

		await prisma.user.update({
			where: { id: userId },
			data: {
				profilePicture: result.secure_url,
			},
		});

		return NextResponse.json(
			{ message: 'An error occurred please contact ' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: `Error updating Profile: ${error.message}` },
			{ status: 500 },
		);
	}
}
