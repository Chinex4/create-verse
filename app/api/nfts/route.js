import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const nfts = await prisma.nFT.findMany({
			include: {
				owner: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(nfts, { status: 200 });
	} catch(err) {
        return NextResponse.json(
            {error: err || 'Failed to Fetch NFTs'},
            {status: 500}
        )
    }
}
