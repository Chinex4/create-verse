import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Set up multer for handling file uploads
const upload = multer({
	dest: './public/uploads',
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
	fileFilter: (req, file, cb) => {
		// Accept only certain file types
		const fileTypes = /jpeg|jpg|png|gif/;
		const extname = fileTypes.test(
			path.extname(file.originalname).toLowerCase(),
		);
		const mimetype = fileTypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(new Error('Only images are allowed'));
		}
	},
}).single('file');


export async function POST(request) {
	if (request.method !== 'POST') {
		return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
	}

	// console.log(request)

	return new Promise((resolve, reject) => {
		upload(request, null, async (err) => {
			if (err) {
				return resolve(
					NextResponse.json({ error: 'Error uploading NFT' }, { status: 500 }),
				);
			}

			const { price, name, description, royalties, token } = request.body;

			if (!request.file) {
				return resolve(
					NextResponse.json({ error: 'File upload failed' }, { status: 400 }),
				);
			}

			const filePath = path.join('/uploads', path.basename(request.file.path));

			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				const userId = decoded.userId;

				if (!decoded) {
					return resolve(
						NextResponse.json(
							{ error: 'Invalid or expired token' },
							{ status: 400 },
						),
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

				return resolve(
					NextResponse.json(
						{ message: 'NFT created successfully', nft },
						{ status: 200 },
					),
				);
			} catch (error) {
				return resolve(
					NextResponse.json(
						{ error: `Error creating NFT: ${error.message}` },
						{ status: 500 },
					),
				);
			}
		});
	});
}
