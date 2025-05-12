'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/useAuthStore';

export default function SidebarToggler() {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const { setExpand } = useAuthStore();

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Button
			onClick={() => setExpand()}
			className="rounded-full ml-auto !px-0 !size-[34px] bg-black dark:bg-white/20"
		>
			<ArrowLeftRight size={18} className="text-inherit" />
		</Button>
	);
}
