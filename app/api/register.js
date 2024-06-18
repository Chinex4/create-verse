import prisma from '@/prisma/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, firstName, lastName, email, password, confirmPassword } =
			req.body;

		// Validate passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			const user = await prisma.user.create({
				data: {
					username,
					firstName,
					lastName,
					email,
					password: hashedPassword,
				},
			});
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: 'User creation failed' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
