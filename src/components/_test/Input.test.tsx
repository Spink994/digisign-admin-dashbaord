/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Input } from '../ui/input';

describe('Input component', () => {
	test('Toggles password visibility when the eye icon is clicked', () => {
		render(<Input type="password" />);

		const input = screen.getByTestId('digi-input');
		expect(input).toHaveAttribute('type', 'password');

		/**
        |--------------------------------------------------
        | Find the toggle button (eye icon)
        |--------------------------------------------------
        */
		const toggleButton = screen.getByRole('button');
		fireEvent.click(toggleButton);

		/**
        |--------------------------------------------------
        | After clicking, the input type should be 'text'
        |--------------------------------------------------
        */
		expect(input).toHaveAttribute('type', 'text');

		/**
        |--------------------------------------------------
        | Click again to toggle back to 'password'
        |--------------------------------------------------
        */
		fireEvent.click(toggleButton);
		expect(input).toHaveAttribute('type', 'password');
	});
});
