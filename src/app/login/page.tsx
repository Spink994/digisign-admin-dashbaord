'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { authenticateUser } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore, User } from '@/store/useAuthStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LoginPage() {
	/**
    |--------------------------------------------------
    | Route handler
    |--------------------------------------------------
    */
	const router = useRouter();

	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [userType, setUserType] = React.useState('');
	const login = useAuthStore((state) => state.login);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	/**
    |--------------------------------------------------
    | Redirect to dashboard if already logged in
    |--------------------------------------------------
    */
	React.useEffect(() => {
		if (isAuthenticated) {
			router.push('/dashboard');
		}
	}, [isAuthenticated]);

	/**
	|--------------------------------------------------
	| Updates the input fields based on the user type
	|--------------------------------------------------
	*/
	React.useEffect(() => {
		/**
		|--------------------------------------------------
		| For admin users
		|--------------------------------------------------
		*/
		if (userType.toLowerCase() === 'admin') {
			setUsername('Samantha');
			setPassword('admin123');
		}

		/**
		|--------------------------------------------------
		| For editor users
		|--------------------------------------------------
		*/
		if (userType.toLowerCase() === 'editor') {
			setUsername('Karianne');
			setPassword('editor123');
		}
	}, [userType]);

	/**
    |--------------------------------------------------
    | Handle login submit
    |--------------------------------------------------
    */
	const handleLogin = async (e: React.FormEvent) => {
		/**
        |--------------------------------------------------
        | Prevents defaul behaviour
        |--------------------------------------------------
        */
		e.preventDefault();

		setIsLoading(true);

		/**
        |--------------------------------------------------
        | Simulating an async request
        |--------------------------------------------------
        */
		await new Promise((resolve) => setTimeout(resolve, 1500));

		/**
        |--------------------------------------------------
        | Checking the supplied credentials for verification
        |--------------------------------------------------
        */
		const user = authenticateUser(username, password);

		/**
        |--------------------------------------------------
        | If the user is found, user goes to the dashboard
        |--------------------------------------------------
        */
		if (user) {
			login(user as unknown as User);

			/**
            |--------------------------------------------------
            | Success notification
            |--------------------------------------------------
            */
			toast('Login successful!', {
				position: 'top-center',
				style: { backgroundColor: 'var(--color-green-400)', color: '#ffffff' },
			});

			/**
            |--------------------------------------------------
            | Routes the user to the dashboard
            |--------------------------------------------------
            */
			router.push('/dashboard');
		} else {
			toast('Invalid credentials', {
				position: 'top-center',
				style: { backgroundColor: 'var(--color-rose-600)', color: '#ffffff' },
			});
		}

		setIsLoading(false);
	};

	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black px-[4%]">
			<form
				onSubmit={handleLogin}
				className="bg-white dark:bg-white/10 px-4 py-8 md:p-12 rounded-lg shadow-md w-full max-w-xl"
			>
				{/**
                |--------------------------------------------------
                | Header title
                |--------------------------------------------------
                */}
				<h2 className="text-xl font-bold text-center mb-4 dark:text-white">Login to your dashboard</h2>

				{/**
				|--------------------------------------------------
				| Login as
				|--------------------------------------------------
				*/}
				<Select onValueChange={(value) => setUserType(value)}>
					{/**
					|--------------------------------------------------
					| Trigger
					|--------------------------------------------------
					*/}
					<SelectTrigger className="w-full !rounded-sm min-h-[44px] mb-3">
						<SelectValue placeholder="User type" />
					</SelectTrigger>

					{/**
					|--------------------------------------------------
					| Content
					|--------------------------------------------------
					*/}
					<SelectContent>
						<SelectItem value="admin">Admin</SelectItem>
						<SelectItem value="editor">Editor</SelectItem>
					</SelectContent>
				</Select>

				{/**
                |--------------------------------------------------
                | Username
                |--------------------------------------------------
                */}
				<Input
					disabled
					type="text"
					value={username}
					placeholder="Username"
					className="w-full p-2 border rounded mb-3 min-h-[44px]"
				/>

				{/**
                |--------------------------------------------------
                | Password field
                |--------------------------------------------------
                */}
				<Input
					disabled
					type="password"
					value={password}
					placeholder="Password"
					className="w-full p-2 border rounded mb-3 min-h-[44px]"
				/>

				{/**
                |--------------------------------------------------
                | Submit button
                |--------------------------------------------------
                */}
				<Button
					type="submit"
					variant="default"
					disabled={isLoading}
					isLoading={isLoading}
					className="w-full min-h-[44px] mt-4"
				>
					Login
				</Button>
			</form>
		</div>
	);
}
