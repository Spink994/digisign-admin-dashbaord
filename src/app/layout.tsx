/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

/**
|--------------------------------------------------
| Applied font
|--------------------------------------------------
*/
const dm_sans = DM_Sans({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

/**
|--------------------------------------------------
| Meta information
|--------------------------------------------------
*/
export const metadata: Metadata = {
	title: 'Admin dashoboard',
	description: 'This is an admin dashboard take-home assessment.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${dm_sans.variable} antialiased`}>
				<ThemeProvider>
					{/**
					|--------------------------------------------------
					| Chidren components
					|--------------------------------------------------
					*/}
					<main>
						{/**
						|--------------------------------------------------
						| Theme toggle for light and dark modes
						|--------------------------------------------------
						*/}
						<div className="w-max right-9 flex items-end fixed z-[400] top-1 md:top-4">
							<ThemeToggle />
						</div>

						{/**
						|--------------------------------------------------
						|
						|--------------------------------------------------
						*/}
						{children}
					</main>

					{/**
					|--------------------------------------------------
					| For the toast notification
					|--------------------------------------------------
					*/}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
