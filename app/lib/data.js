import firstimg from '@/public/TRENDING/IMG-20231010-WA0035.jpg';
import secondimg from '@/public/TRENDING/IMG-20231010-WA0036.jpg';
import thirdimg from '@/public/TRENDING/IMG-20231010-WA0037.jpg';
import fourthimg from '@/public/TRENDING/IMG-20231010-WA0038.jpg';
import fifthimg from '@/public/TRENDING/IMG-20231010-WA0039.jpg';
import sixthimg from '@/public/TRENDING/IMG-20231010-WA0040.jpg';
import seventhimg from '@/public/TRENDING/IMG-20231010-WA0041.jpg';
import eightimg from '@/public/TRENDING/IMG-20231010-WA0042.jpg';
import ninthimg from '@/public/TRENDING/IMG-20231010-WA0043.jpg';
import tenthimg from '@/public/TRENDING/IMG-20231010-WA0044.jpg';
import Icon from '@/app/components/UI/Icon';


export const nftData = [
	{
		image: firstimg,
		price: 2.5,
		availability: true,
		date: '2024-06-01',
	},
	{
		image: secondimg,
		price: 2.5,
		availability: false,
		date: '2024-06-03',
	},
	{
		image: thirdimg,
		price: 2.5,
		availability: false,
		date: '2024-06-03',
	},
	{
		image: fourthimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},
	{
		image: fifthimg,
		price: 2.5,
		availability: false,
		date: '2024-06-03',
	},
	{
		image: sixthimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},
	{
		image: seventhimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},
	{
		image: eightimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},
	{
		image: ninthimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},
	{
		image: tenthimg,
		price: 2.5,
		availability: true,
		date: '2024-06-03',
	},

	// Add 7 more items with the same structure
];

export const STEPS = [
	{
		icon: (
			<Icon
				path={
					<path d='M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z' />
				}
			/>
		),
		title: 'Set up your wallet',
		info: 'Once you’ve set up your wallet of choice, connect it to CreateVerse by clicking the wallet icon in the top right corner.',
	},
	{
		icon: (
			<Icon
				path={
					<path d='M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z' />
				}
			/>
		),
		title: 'Create your collection',
		info: 'Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
	},
	{
		icon: (
			<Icon
				path={
					<path
						fillRule='evenodd'
						d='M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
						clipRule='evenodd'
					/>
				}
			/>
		),
		title: 'Add your NFTs',
		info: 'Upload your work add a title and description, and customize your NFTs with properties, stats, and content.',
	},
	{
		icon: (
			<Icon
				path={
					<path
						fillRule='evenodd'
						d='M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z'
						clipRule='evenodd'
					/>
				}
			/>
		),
		title: 'List them for sale',
		info: 'Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!',
	},
];
