'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { useRouter } from 'next/navigation';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { useAuthStore } from '@/store/useAuthStore';

export default function WithAuth<P extends Record<string, any>>(
	Component: React.ComponentType<P>,
	allowedRoles: string[] = []
) {
	/**
    |--------------------------------------------------
    | Returned Auth wrapper
    |--------------------------------------------------
    */
	const AuthWrapper = (props: P) => {
		/**
        |--------------------------------------------------
        | Route handler
        |--------------------------------------------------
        */
		const router = useRouter();

		/**
        |--------------------------------------------------
        | State
        |--------------------------------------------------
        */
		const { user, isAuthenticated } = useAuthStore();

		/**
        |--------------------------------------------------
        | We consider auth state "ready" when we've loaded
        | the user and the auth state.
        |--------------------------------------------------
        */
		const isAuthReady = React.useMemo(() => {
			return typeof isAuthenticated === 'boolean' && user !== null;
		}, [isAuthenticated, user]);

		/**
        |--------------------------------------------------
        | Checking the auth state and role
        |--------------------------------------------------
        */
		React.useLayoutEffect(() => {
			if (!isAuthReady) return;

			/**
            |--------------------------------------------------
            | ...
            |--------------------------------------------------
            */
			if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
				router.push('/login');
			}
		}, [isAuthReady, isAuthenticated, user]);

		/**
        |--------------------------------------------------
        | Rendered view
        |--------------------------------------------------
        */
		return <Component {...props} />;
	};

	/**
    |--------------------------------------------------
    | Returning the auth wrapper
    |--------------------------------------------------
    */
	return AuthWrapper;
}
