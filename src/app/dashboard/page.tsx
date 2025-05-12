'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { User, AtSign, Phone, Globe, MapPin, Building, ShieldCheck, Badge } from 'lucide-react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { fetcher } from '@/lib/fetcher';
import { Post } from '@/store/usePostStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/skeleton';

/**
|--------------------------------------------------
| Card Component
|--------------------------------------------------
*/
const InfoCard = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon: React.ElementType }) => (
	<div className="bg-gray-300 border rounded-sm shadow-sm p-4 w-full flex items-center gap-2 h-[120px]">
		{/**
        |--------------------------------------------------
        | Relevant icon
        |--------------------------------------------------
        */}
		<Icon className="w-12 h-12" />

		{/**
        |--------------------------------------------------
        | Information
        |--------------------------------------------------
        */}
		<div className="flex items-start text-gray-600 flex-col">
			<span className="text-xs font-bold">{label}</span>
			<p className="text-sm font-semibold text-gray-900 capitalize">{value}</p>
		</div>
	</div>
);

/**
|--------------------------------------------------
| Dashboard Page
|--------------------------------------------------
*/
export default function Dashboard() {
	/**
    |--------------------------------------------------
    | State from zustand
    |--------------------------------------------------
    */
	const { user } = useAuthStore();
	const [posts, setPosts] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	/**
    |--------------------------------------------------
    | This data shows how wordy posts are, by showing a
    | visual of the length of characters in both the
    | title and the body
    |--------------------------------------------------
    */
	const data = posts.map((post) => ({
		id: `Post ${post.id}`,
		titleLength: post.title.length,
		bodyLength: post.body.length,
	}));

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
			</div>
		);
	}

	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className="p-6 h-full overflow-auto">
			<h1 className="text-2xl font-semibold mb-6 text-black">Dashboard</h1>

			{/**
            |--------------------------------------------------
            | User's information
            |--------------------------------------------------
            */}
			<div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
				<InfoCard label="Full Name" value={user?.name} icon={User} />
				<InfoCard label="Username" value={user?.username} icon={Badge} />
				<InfoCard label="Email" value={user?.email} icon={AtSign} />
				<InfoCard label="Phone" value={user?.phone} icon={Phone} />
				<InfoCard
					label="Website"
					value={
						<a
							target="_blank"
							className="underline"
							rel="noopener noreferrer"
							href={`https://${user?.website}`}
						>
							{user?.website}
						</a>
					}
					icon={Globe}
				/>
				<InfoCard label="Role" value={user?.role} icon={ShieldCheck} />
				<InfoCard
					icon={MapPin}
					label="Address"
					value={`${user?.address.street}, ${user?.address.suite}, ${user?.address.city}, ${user?.address.zipcode}`}
				/>
				<InfoCard label="Company Name" value={user?.company.name} icon={Building} />
			</div>

			{/**
			|--------------------------------------------------
			| Chart header
			|--------------------------------------------------
			*/}
			<div className="mt-12">
				<h1 className="text-lg font-bold dark:text-black">Post Verbosity Graph</h1>
			</div>

			{/**
            |--------------------------------------------------
            | Chart
            |--------------------------------------------------
            */}
			<div className="w-full h-96">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart className="text-xs" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="id" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							className="text-xs"
							type="monotone"
							dataKey="titleLength"
							stroke="#8884d8"
							name="Title Length"
						/>
						<Line
							className="text-xs"
							type="monotone"
							dataKey="bodyLength"
							stroke="#82ca9d"
							name="Body Length"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
