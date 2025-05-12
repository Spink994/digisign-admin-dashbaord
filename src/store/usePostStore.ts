/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
|--------------------------------------------------
| Geo interface
|--------------------------------------------------
*/
export interface SinglePost {
	id: number;
	body: string;
	title: string;
}

/**
|--------------------------------------------------
| Interface
|--------------------------------------------------
*/
export interface Post {
	id: number;
	body: string;
	title: string;
	userId: number;
}

/**
|--------------------------------------------------
| Interface for the Auth state
|--------------------------------------------------
*/
interface PostState {
	post: SinglePost | null;
	setPost: (post: SinglePost | null) => void;
}

export const usePostStore = create<PostState>()(
	persist(
		(set) => ({
			/**
            |--------------------------------------------------
            | Initial state
            |--------------------------------------------------
            */
			post: null,
			setPost: (post) => {
				/**
                |--------------------------------------------------
                | Persist post to Zustand store
                |--------------------------------------------------
                */
				set({ post });
			},
		}),

		/**
        |--------------------------------------------------
        | Storage name
        |--------------------------------------------------
        */
		{
			name: 'post',
		}
	)
);
