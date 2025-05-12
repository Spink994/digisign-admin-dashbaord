'use client';
/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { fetcher } from '@/lib/fetcher';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
|--------------------------------------------------
| Comments interface
|--------------------------------------------------
*/
interface Comment {
	id: number;
	name: string;
	email: string;
	body: string;
	postId: number;
}

/**
|--------------------------------------------------
| Post interface
|--------------------------------------------------
*/
interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export default function PostDetailsPage({ params }: { params: Promise<{ postId: string }> }) {
	const router = useRouter();
	const { postId } = React.use(params);

	/**
    |--------------------------------------------------
    | Component states
    |--------------------------------------------------
    */
	const [post, setPost] = React.useState<Post | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [comments, setComments] = React.useState<Comment[]>([]);

	/**
    |--------------------------------------------------
    | Fetches the post and comments
    |--------------------------------------------------
    */
	React.useEffect(() => {
		/**
        |--------------------------------------------------
        | If the post id is available
        |--------------------------------------------------
        */
		if (!postId) return;

		/**
        |--------------------------------------------------
        | ...
        |--------------------------------------------------
        */
		const fetchPostAndComments = async () => {
			try {
				const [postData, commentsData] = await Promise.all([
					fetcher<Post>(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}`),
					fetcher<Comment[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postId}/comments`),
				]);

				/**
                |--------------------------------------------------
                | Storing the data in state
                |--------------------------------------------------
                */
				setPost(postData);
				setComments(commentsData);
			} catch (error) {
				/**
                |--------------------------------------------------
                | Error notification
                |--------------------------------------------------
                */
				toast('Failed to fetch post or comments!', {
					position: 'top-center',
					style: { backgroundColor: 'var(--color-red-500)', color: '#ffffff' },
				});
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		/**
        |--------------------------------------------------
        | function call for the api
        |--------------------------------------------------
        */
		fetchPostAndComments();
	}, [postId]);

	/**
    |--------------------------------------------------
    | Loading state
    |--------------------------------------------------
    */
	if (loading) {
		return (
			<div className="p-4 space-y-4">
				<Skeleton className="h-6 w-1/2" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-16 w-full" />
			</div>
		);
	}

	/**
    |--------------------------------------------------
    | When no post is found
    |--------------------------------------------------
    */
	if (!post) return <p className="p-4 text-red-500">Post not found.</p>;

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			initial={{ opacity: 0, y: 10 }}
			className="p-4 space-y-6 w-full h-full overflow-y-auto"
		>
			<Button
				variant="outline"
				onClick={() => router.back()}
				className="flex gap-1 text-black hover:bg-transparent hover:text-black/40"
			>
				<ChevronLeft />
				<span>Go back</span>
			</Button>

			<div className="flex flex-col">
				<h1 className="text-black font-bold">{post.title}</h1>
				<p className="text-black text-sm max-w-[700px]">{post.body}</p>
			</div>

			{/**
            |--------------------------------------------------
            | Comments
            |--------------------------------------------------
            */}
			<div>
				<h3 className="text-lg font-semibold mb-3 text-black">Comments ({comments.length})</h3>

				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<div className="grid gap-4">
					{comments.map((comment) => (
						<Card key={comment.id} className="bg-transparent shadow-none">
							{/**
                            |--------------------------------------------------
                            | Name and email
                            |--------------------------------------------------
                            */}
							<CardHeader className="pb-2">
								<CardTitle className="text-sm text-black">{comment.name}</CardTitle>
								<p className="text-xs text-black">{comment.email}</p>
							</CardHeader>

							{/**
                            |--------------------------------------------------
                            | Content
                            |--------------------------------------------------
                            */}
							<CardContent>
								<p className="text-black text-sm max-w-[700px]">{comment.body}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</motion.div>
	);
}
