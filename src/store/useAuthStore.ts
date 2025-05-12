/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
|--------------------------------------------------
| Geo interface
|--------------------------------------------------
*/
export interface Geo {
	lat: string;
	lng: string;
}

/**
|--------------------------------------------------
| Address interface
|--------------------------------------------------
*/
export interface Address {
	geo: Geo;
	city: string;
	suite: string;
	street: string;
	zipcode: string;
}

/**
|--------------------------------------------------
| Company interface
|--------------------------------------------------
*/
export interface Company {
	bs: string;
	name: string;
	catchPhrase: string;
}

/**
|--------------------------------------------------
| User interface
|--------------------------------------------------
*/
export interface User {
	id: number;
	name: string;
	email: string;
	token: string;
	phone: string;
	website: string;
	username: string;
	address: Address;
	company: Company;
	role: 'admin' | 'editor';
}

/**
|--------------------------------------------------
| Interface for the Auth state
|--------------------------------------------------
*/
interface AuthState {
	expand: boolean;
	user: User | null;
	logout: () => void;
	setExpand: () => void;
	isAuthenticated: boolean;
	login: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			/**
            |--------------------------------------------------
            | Initial state
            |--------------------------------------------------
            */
			user: null,
			expand: true,
			isAuthenticated: false,
			login: (user) => {
				/**
				|--------------------------------------------------
				| Storing the token using cookies
				|--------------------------------------------------
				*/
				Cookies.set('token', user.token);

				/**
                |--------------------------------------------------
                | Persist user to Zustand store
                |--------------------------------------------------
                */
				set({
					isAuthenticated: true,
					user: user as unknown as User,
				});
			},
			logout: () => {
				/**
				|--------------------------------------------------
				| Removes the token from the cookie store
				|--------------------------------------------------
				*/
				Cookies.remove('token');

				/**
                |--------------------------------------------------
                | Clear persisted auth state
                |--------------------------------------------------
                */
				set({ isAuthenticated: false, user: null });
			},
			setExpand: () => {
				/**
                |--------------------------------------------------
                | Clear persisted auth state
                |--------------------------------------------------
                */
				set((state) => ({ expand: !state.expand }));
			},
		}),

		/**
        |--------------------------------------------------
        | Storage name
        |--------------------------------------------------
        */
		{
			name: 'auth',
		}
	)
);
