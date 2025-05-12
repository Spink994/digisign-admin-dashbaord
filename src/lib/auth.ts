/**
|--------------------------------------------------
| Mock users
|--------------------------------------------------
*/
export const users = [
	{
		id: 3,
		name: 'Clementine Bauch',
		username: 'Samantha',
		email: 'Nathan@yesenia.net',
		address: {
			street: 'Douglas Extension',
			suite: 'Suite 847',
			city: 'McKenziehaven',
			zipcode: '59590-4157',
		},
		phone: '1-463-123-4447',
		website: 'ramiro.info',
		company: {
			name: 'Romaguera-Jacobson',
			catchPhrase: 'Face to face bifurcated interface',
			bs: 'e-enable strategic applications',
		},
		role: 'admin',
		password: 'admin123',
		token: 'mock-jwt-admin-token',
	},
	{
		id: 4,
		name: 'Patricia Lebsack',
		username: 'Karianne',
		email: 'Julianne.OConner@kory.org',
		address: {
			street: 'Hoeger Mall',
			suite: 'Apt. 692',
			city: 'South Elvis',
			zipcode: '53919-4257',
		},
		phone: '493-170-9623 x156',
		website: 'kale.biz',
		company: {
			name: 'Robel-Corkery',
			catchPhrase: 'Multi-tiered zero tolerance productivity',
			bs: 'transition cutting-edge web services',
		},
		role: 'editor',
		password: 'editor123',
		token: 'mock-jwt-editor-token',
	},
];

export function authenticateUser(username: string, password: string) {
	/**
     |--------------------------------------------------
     | Check user credentials
     |--------------------------------------------------
     */
	return users.find((user) => user.username === username && user.password === password);
}
