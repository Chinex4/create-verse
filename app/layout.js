import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Verse',
	description: 'NFT Market Place',
};

export default function RootLayout({ children }) {
	return (
		<html
			data-theme='light'
			lang='en'>
			<body className={`${inter.className}`}>
				<main className=''>{children}</main>
				<ToastContainer />
			</body>
		</html>
	);
}
