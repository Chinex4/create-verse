import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from './components/MainHeader';

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
			<body className={inter.className}>

        <MainHeader />

				<main>{children}</main>
			</body>
		</html>
	);
}
