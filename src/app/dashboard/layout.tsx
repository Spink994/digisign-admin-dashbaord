/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import SidebarToggler from '@/components/shared/SidebarToggle';
import Sidebar from './components/Sidebar';

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
		<main className="flex dark:bg-white bg-black h-screen overflow-hidden w-screen md:p-4">
			{/**
			|--------------------------------------------------
			| Sidebar
			|--------------------------------------------------
			*/}
			<Sidebar />

			{/**
			|--------------------------------------------------
			| Childrens
			|--------------------------------------------------
			*/}
			<div className="rounded-2xl bg-white w-full max-h-[calc(100vh_-_16px)] overflow-hidden">
				<div className="fixed top-6 md:top-9 right-24 md:!hidden">
					<SidebarToggler />
				</div>

				{/**
				|--------------------------------------------------
				| Chidren
				|--------------------------------------------------
				*/}
				{children}
			</div>
		</main>
	);
}
