jest.setTimeout(20000);

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Button } from '../ui/button';

/**
|--------------------------------------------------
| Tests for button
|--------------------------------------------------
*/
describe('Button component', () => {
	test('Calls onClick when clicked', async () => {
		const user = userEvent.setup();

		/**
		|--------------------------------------------------
		| Mock click function
		|--------------------------------------------------
		*/
		const handleClick = jest.fn();

		/**
		|--------------------------------------------------
		| Renders the button
		|--------------------------------------------------
		*/
		render(<Button onClick={handleClick} />);

		/**
		|--------------------------------------------------
		| Gets the button
		|--------------------------------------------------
		*/
		const button = screen.getByTestId('digi-button');

		/**
		|--------------------------------------------------
		| Firing the event
		|--------------------------------------------------
		*/
		await user.click(button);

		/**
		|--------------------------------------------------
		| Expected outcome
		|--------------------------------------------------
		*/
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
