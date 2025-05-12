/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import { render, screen } from '@testing-library/react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';

describe('Card component', () => {
	test('Renders all card sections correctly', () => {
		/**
		|--------------------------------------------------
		| Rendered card
		|--------------------------------------------------
		*/
		render(
			<Card>
				{/**
				|--------------------------------------------------
				|
				|--------------------------------------------------
				*/}
				<CardHeader>
					<CardTitle>Test Title</CardTitle>
					<CardDescription>Test Description</CardDescription>
				</CardHeader>

				{/**
				|--------------------------------------------------
				|
				|--------------------------------------------------
				*/}
				<CardContent>
					<p>Test Content</p>
				</CardContent>

				{/**
				|--------------------------------------------------
				|
				|--------------------------------------------------
				*/}
				<CardFooter>
					<button>Test Button</button>
				</CardFooter>
			</Card>
		);

		/**
		|--------------------------------------------------
		| Query elements by their data-testid
		|--------------------------------------------------
		*/
		expect(screen.getByTestId('card')).toBeInTheDocument();
		expect(screen.getByTestId('card-header')).toBeInTheDocument();
		expect(screen.getByTestId('card-title')).toHaveTextContent('Test Title');
		expect(screen.getByTestId('card-description')).toHaveTextContent('Test Description');
		expect(screen.getByTestId('card-content')).toHaveTextContent('Test Content');
		expect(screen.getByTestId('card-footer')).toBeInTheDocument();
	});
});
