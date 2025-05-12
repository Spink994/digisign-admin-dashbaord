'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftRight, DnaIcon, HomeIcon, LogOutIcon, PlusIcon, User } from 'lucide-react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

/**
|--------------------------------------------------
| Sidebar navigation items
|--------------------------------------------------
*/
const _SIDEBAR_NAVIGATION = [
	{
		icon: HomeIcon,
		name: 'Dashboard',
		route: '/dashboard',
	},
	{
		icon: PlusIcon,
		name: 'Posts',
		route: '/dashboard/posts',
	},
];

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();

	/**
	|--------------------------------------------------
	| Zustand actions/reducers
	|--------------------------------------------------
	*/
	const { logout, user, setExpand, expand } = useAuthStore();

	/**
	|--------------------------------------------------
	| Trigger ref
	|--------------------------------------------------
	*/
	const trigger_ref = React.useRef<HTMLButtonElement>(null);

	/**
	|--------------------------------------------------
	| Capturing paths with extra params
	|--------------------------------------------------
	*/
	const pathname_ = pathname.split('/');
	const current_path = pathname_.length > 3 ? pathname_.slice(0, 3).join('/') : pathname;

	/**
	|--------------------------------------------------
	| Handles logging user out
	|--------------------------------------------------
	*/
	const handleLogout = () => {
		logout();
		trigger_ref.current?.click();
		router.push('/');
	};

	/**
    |--------------------------------------------------
    | Rendered Views
    |--------------------------------------------------
    */
	return (
		<div
			className={cn(
				'fixed z-[5000] md:sticky top-0 flex flex-col w-full dark:bg-white transition-all  md:w-[206px] h-screen overflow-y-auto pb-8 bg-black',
				expand ? 'md:min-w-[230px] max-w-[230px] !left-0' : 'left-[-400px] w-0 md:min-w-[20px] max-w-[60px]'
			)}
		>
			{/**
            |--------------------------------------------------
            | Header
            |--------------------------------------------------
            */}
			<div
				className={cn(
					'w-full max-w-[206px] dark:text-black text-white flex items-center gap-3 py-6 px-4',
					!expand && 'pl-0'
				)}
			>
				{expand && (
					<div className="border rounded-full p-1 bg-black text-white">
						<DnaIcon size={14} className="text-inherit" />
					</div>
				)}
				{expand && <span className="text-inherit text-sm">DigiSign</span>}

				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<Button
					onClick={() => setExpand()}
					className="rounded-full ml-auto !px-0 !size-[34px] bg-black dark:bg-white/20"
				>
					<ArrowLeftRight size={18} className="text-inherit" />
				</Button>
			</div>

			{/**
            |--------------------------------------------------
            | Navigation links
            |--------------------------------------------------
            */}
			{_SIDEBAR_NAVIGATION.map((item) => (
				<Link
					key={item.name}
					href={item.route}
					className={cn(
						'h-[52px] text-sm gap-3 hover:bg-white/20 mb-2 w-full md:max-w-[206px] dark:text-black text-white flex items-center px-4 rounded-md',
						current_path === item.route && 'bg-white/30 dark:text-white dark:bg-black',
						!expand && '!hidden'
					)}
				>
					<item.icon /> {item.name}
				</Link>
			))}

			{/**
            |--------------------------------------------------
            | Logout Modal
            |--------------------------------------------------
            */}
			<Dialog>
				{/**
				|--------------------------------------------------
				| Trigger
				|--------------------------------------------------
				*/}
				{expand && (
					<DialogTrigger
						ref={trigger_ref}
						className={cn(
							'h-[52px] w-full text-sm gap-3 hover:bg-white/20 md:max-w-[206px] dark:text-black text-white flex items-center px-4 rounded-md'
						)}
					>
						<LogOutIcon /> <span>Logout</span>
					</DialogTrigger>
				)}

				{/**
				|--------------------------------------------------
				| Content
				|--------------------------------------------------
				*/}
				<DialogContent className="!rounded-sm">
					<p className="text-center">Are you sure you want to logout?</p>

					{/**
					|--------------------------------------------------
					| Action buttons
					|--------------------------------------------------
					*/}
					<div className="flex items-center gap-5 w-full justify-center">
						{/**
						|--------------------------------------------------
						| Cancels the modal
						|--------------------------------------------------
						*/}
						<Button onClick={() => trigger_ref.current?.click()} className="bg-gray-200">
							<span className="text-black">Cancel</span>
						</Button>

						{/**
						|--------------------------------------------------
						| Logs the user out
						|--------------------------------------------------
						*/}
						<Button onClick={handleLogout} className="bg-rose-600">
							<span className="text-white">Continue</span>
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/**
            |--------------------------------------------------
            | User profile
            |--------------------------------------------------
            */}
			{expand && (
				<div className="bg-white/20 dark:bg-black/90 w-full max-w-[206px] p-4 rounded-md mt-auto flex items-center gap-3">
					{/**
                    |--------------------------------------------------
                    | User Avatar
                    |--------------------------------------------------
                    */}
					<div className="bg-white/30 rounded-full size-[52px] flex items-center justify-center">
						<User className="text-white/80" />
					</div>

					{/**
                    |--------------------------------------------------
                    | User info
                    |--------------------------------------------------
                    */}
					<div className="flex flex-col">
						<span className="text-white text-xs">{user?.username}</span>
						<span className="text-white capitalize text-xs">{user?.role}</span>
					</div>
				</div>
			)}
		</div>
	);
}
