'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { EditIcon, EllipsisVertical, EyeIcon, Search, Trash2 } from 'lucide-react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { fetcher } from '@/lib/fetcher';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Post, usePostStore } from '@/store/usePostStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function PostsPage() {
	const router = useRouter();
	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const { user } = useAuthStore();
	const { setPost } = usePostStore();
	const [posts, setPosts] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

	/**
	|--------------------------------------------------
	| Handles deleting a post
	|--------------------------------------------------
	*/
	const handleDeletePost = async (postId: number) => {
		try {
			setIsDeleting(true);
			/**
			|--------------------------------------------------
			| Api call
			|--------------------------------------------------
			*/
			await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`, {
				method: 'DELETE',
			});

			/**
			|--------------------------------------------------
			| Toast notification
			|--------------------------------------------------
			*/
			toast('Post deleted successfully!', {
				position: 'top-center',
				style: { backgroundColor: 'var(--color-green-400)', color: '#ffffff' },
			});

			/**
			|--------------------------------------------------
			| Refreshes the current page
			|--------------------------------------------------
			*/
			router.refresh();
		} catch (error) {
			console.error(error);
			toast('Error deleting post', {
				position: 'top-center',
				style: { backgroundColor: 'var(--color-rose-600)', color: '#ffffff' },
			});
		} finally {
			setIsDeleting(false);
		}
	};

	/**
   |--------------------------------------------------
   | Fetch posts from JSONPlaceholder
   |--------------------------------------------------
   */
	React.useEffect(() => {
		(async () => {
			try {
				/**
				|--------------------------------------------------
				| Starts the loading state
				|--------------------------------------------------
				*/
				setIsLoading(true);

				/**
				|--------------------------------------------------
				| Api call
				|--------------------------------------------------
				*/
				const response = await fetcher<Post[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?_limit=20`);
				setPosts(response);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	/**
	|--------------------------------------------------
	| Posts
	|--------------------------------------------------
	*/
	const _POSTS = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

	/**
    |--------------------------------------------------
    | Loading state
    |--------------------------------------------------
    */
	if (isLoading) {
		return (
			<div className="p-4 space-y-4">
				<Skeleton className="h-6 w-1/2" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
			</div>
		);
	}

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
			{/**
            |--------------------------------------------------
            | Posts
            |--------------------------------------------------
            */}
			<h2 className="text-2xl font-semibold mb-4">Posts</h2>

			{/**
            |--------------------------------------------------
            | Search
            |--------------------------------------------------
            */}
			<div className="flex items-center border border-black/20 rounded-sm px-4 max-w-[300px] mb-4">
				<Search size={16} />
				<Input
					value={searchQuery}
					placeholder="Search posts"
					onChange={(event) => setSearchQuery(event.target.value)}
					className="outline-none h-11 border-none ring-0 focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-[0px]"
				/>
			</div>

			{/**
			|--------------------------------------------------
			| Table for the posts
			|--------------------------------------------------
			*/}
			<div className="w-full overflow-x-auto">
				<table className="w-full min-w-[1200px] divide-y divide-gray-200 border rounded-md overflow-hidden">
					{/**
					|--------------------------------------------------
					| Table head
					|--------------------------------------------------
					*/}
					<thead className="bg-gray-100 w-full">
						<tr className="grid grid-cols-4">
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 col-span-1">
								Title
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 col-span-2">Body</th>
							<th className="px-4 py-2 text-sm font-semibold text-gray-700 col-span-1 text-left"></th>
						</tr>
					</thead>

					{/**
					|--------------------------------------------------
					| Table body
					|--------------------------------------------------
					*/}
					<tbody className="divide-y divide-gray-200 bg-white">
						{_POSTS?.map((post) => (
							<motion.tr
								key={post.id}
								whileHover={{ scale: 1.01 }}
								className="transition-transform grid grid-cols-4"
							>
								{/**
								|--------------------------------------------------
								| Title
								|--------------------------------------------------
								*/}
								<td className="px-4 py-3 text-sm text-gray-800 font-medium col-span-1">{post.title}</td>

								{/**
								|--------------------------------------------------
								| Body
								|--------------------------------------------------
								*/}
								<td className="px-4 py-3 text-sm text-gray-700 col-span-2">{post.body}</td>

								{/**
								|--------------------------------------------------
								| Admin actions
								|--------------------------------------------------
								*/}

								<td className="px-4 py-3 text-sm col-span-1 text-center">
									<Popover>
										{/**
										|--------------------------------------------------
										| Trigger
										|--------------------------------------------------
										*/}
										<PopoverTrigger>
											<EllipsisVertical />
										</PopoverTrigger>

										{/**
										|--------------------------------------------------
										| Content
										|--------------------------------------------------
										*/}
										<PopoverContent className="bg-gray-50 max-w-[200px]">
											<div className="h-full w-full flex items-start flex-col gap-1">
												{/**
												|--------------------------------------------------
												| View post
												|--------------------------------------------------
												*/}
												<Link
													href={`/dashboard/posts/${post?.id}`}
													className="text-sm rounded flex items-center gap-2 hover:bg-gray-200 p-2 w-full"
												>
													<EyeIcon size={18} className="text-black" />
													<span className="text-black text-xs">View</span>
												</Link>

												{/**
												|--------------------------------------------------
												| For admin only
												|--------------------------------------------------
												*/}
												{user?.role === 'admin' && (
													<React.Fragment>
														{/**
														|--------------------------------------------------
														| Edit post
														|--------------------------------------------------
														*/}
														<Link
															onClick={() =>
																setPost({
																	id: post.id,
																	body: post.body,
																	title: post.title,
																})
															}
															href="/dashboard/posts/edit"
															className="text-xs rounded flex items-center gap-2 hover:bg-gray-200 p-2 w-full"
														>
															<EditIcon size={18} className="text-black" />
															<span className="text-black text-xs">Edit</span>
														</Link>

														{/**
														|--------------------------------------------------
														| Delete post
														|--------------------------------------------------
														*/}
														<Button
															isLoading={isDeleting}
															onClick={() => handleDeletePost(post?.id)}
															className="text-sm bg-transparent rounded flex items-center gap-2 hover:bg-gray-200 !p-2 w-full justify-start"
														>
															<Trash2 size={18} className="text-black" />
															<span className="text-black text-xs">Delete</span>
														</Button>
													</React.Fragment>
												)}
											</div>
										</PopoverContent>
									</Popover>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
}
