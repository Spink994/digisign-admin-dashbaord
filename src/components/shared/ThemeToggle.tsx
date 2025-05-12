'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { Sun, Moon } from 'lucide-react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
	/**
    |--------------------------------------------------
    | States
    |--------------------------------------------------
    */
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	/**
    |--------------------------------------------------
    | For hydration purposes
    |--------------------------------------------------
    */
	React.useEffect(() => {
		setMounted(true);
	}, []);

	/**
    |--------------------------------------------------
    |  Prevent hydration mismatch
    |--------------------------------------------------
    */
	if (!mounted) return null;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<Button
			size="icon"
			variant="outline"
			onClick={() => toggleTheme()}
			className="w-max size-10 ml-auto my-4 !bg-black"
		>
			{theme === 'dark' ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
		</Button>
	);
}
