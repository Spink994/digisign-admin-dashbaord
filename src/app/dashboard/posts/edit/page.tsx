'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { motion } from 'framer-motion';
import React, { FormEvent } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import WithAuth from '@/lib/withAuth';
import { fetcher } from '@/lib/fetcher';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SinglePost, usePostStore } from '@/store/usePostStore';

function EditPost() {
	/**
    |--------------------------------------------------
    | Route handler
    |--------------------------------------------------
    */
	const router = useRouter();
	const { post } = usePostStore();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
	const [formData, setFormData] = React.useState<SinglePost>(post as SinglePost);

	/**
	|--------------------------------------------------
	| Handles input changes
	|--------------------------------------------------
	*/
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	/**
	|--------------------------------------------------
	| Validates the form fields
	|--------------------------------------------------
	*/
	const validate = () => {
		const newErrors: { [key: string]: string } = {};

		/**
        |--------------------------------------------------
        | Checks if the body or tile is empty
        |--------------------------------------------------
        */
		if (!formData.title.trim()) newErrors.title = 'Title is required';
		if (!formData.body.trim()) newErrors.content = 'Body is required';

		return newErrors;
	};

	/**
	|--------------------------------------------------
	| Handles form submission
	|--------------------------------------------------
	*/
	const handleSubmit = async (e: FormEvent) => {
		/**
        |--------------------------------------------------
        | Prevents default behaviour
        |--------------------------------------------------
        */
		e.preventDefault();
		const validationErrors = validate();

		/**
        |--------------------------------------------------
        | Errors
        |--------------------------------------------------
        */
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		try {
			setIsSubmitting(true);
			/**
            |--------------------------------------------------
            | Api call
            |--------------------------------------------------
            */
			const response = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post?.id}`, {
				method: 'PATCH',
			});

			console.log(response);
			router.back();
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			initial={{ opacity: 0, y: 10 }}
			className="p-4 text-gray-900 h-full overflow-y-auto w-full"
		>
			<Button
				variant="outline"
				onClick={() => router.back()}
				className="flex !px-0 gap-1 text-black hover:bg-transparent hover:text-black/40"
			>
				<ChevronLeft />
				<span>Go back</span>
			</Button>

			{/**
            |--------------------------------------------------
            |
            |--------------------------------------------------
            */}
			<form onSubmit={handleSubmit} className="space-y-6 mx-auto bg-white shadow p-6 rounded-xl">
				<h2 className="text-2xl font-bold">Edit Post</h2>

				{/**
                |--------------------------------------------------
                | Title Field
                |--------------------------------------------------
                */}
				<div>
					<label className="block font-medium mb-1">Title</label>
					<Input
						name="title"
						value={formData?.title}
						onChange={handleChange}
						className="w-full p-2 border text-sm border-gray-300 rounded"
					/>
					{errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
				</div>

				{/**
                |--------------------------------------------------
                | Content Field
                |--------------------------------------------------
                */}
				<div>
					<label className="block font-medium mb-1">Content</label>
					<textarea
						rows={6}
						name="body"
						value={formData?.body}
						onChange={handleChange}
						className="w-full p-2 border text-sm border-gray-300 rounded resize-none"
					/>
					{errors.content && <p className="text-sm text-red-500 mt-1">{errors.content}</p>}
				</div>

				{/**
                |--------------------------------------------------
                | Submit Button
                |--------------------------------------------------
                */}
				<Button
					type="submit"
					variant="default"
					disabled={isSubmitting}
					isLoading={isSubmitting}
					className="text-white px-6 py-2 rounded dark:bg-background bg-black hover:bg-black/80"
				>
					Update Post
				</Button>
			</form>
		</motion.div>
	);
}

export default WithAuth(EditPost, ['admin']);
