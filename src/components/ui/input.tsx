/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	/**
	|--------------------------------------------------
	| State to toggle password visibility
	|--------------------------------------------------
	*/
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	/**
	|--------------------------------------------------
	|  Function to toggle password visibility
	|--------------------------------------------------
	*/
	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	/**
  |--------------------------------------------------
  | Rendered View
  |--------------------------------------------------
  */
	return (
		<div className="relative w-full">
			<input
				data-slot="input"
				data-testid="digi-input"
				type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					className
				)}
				{...props}
			/>

			{/**
			|--------------------------------------------------
			| Eye Icon for Password Visibility Toggle
			|--------------------------------------------------
			*/}
			{type === 'password' && (
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-3 top-1/2 transform -translate-y-1/2"
				>
					{isPasswordVisible ? <EyeOff /> : <Eye />}
				</button>
			)}
		</div>
	);
}

export { Input };
