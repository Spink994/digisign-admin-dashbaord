'use client';

/**
|--------------------------------------------------
| Npm import
|--------------------------------------------------
*/
import React, { createContext, useContext } from 'react';

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
interface ThemeContextProps {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

/**
|--------------------------------------------------
| Create context
|--------------------------------------------------
*/
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
|--------------------------------------------------
| Provider
|--------------------------------------------------
*/
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

	React.useEffect(() => {
		/**
        |--------------------------------------------------
        | Check user's saved preference
        |--------------------------------------------------
        */
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.classList.toggle('dark', savedTheme === 'dark');
		}
	}, []);

	/**
    |--------------------------------------------------
    | Handles theme toggle
    |--------------------------------------------------
    */
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
		localStorage.setItem('theme', newTheme);
	};

	/**
    |--------------------------------------------------
    | Returned Wrapper
    |--------------------------------------------------
    */
	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

/**
|--------------------------------------------------
| Hook to use theme easily
|--------------------------------------------------
*/
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
