/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

describe('Popover component', () => {
	test('Opens and closes the popover content on trigger click', async () => {
		/**
        |--------------------------------------------------
        | Rendered component
        |--------------------------------------------------
        */
		render(
			<Popover>
				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<PopoverTrigger>Open Popover</PopoverTrigger>

				{/**
                |--------------------------------------------------
                |
                |--------------------------------------------------
                */}
				<PopoverContent>Popover Content</PopoverContent>
			</Popover>
		);

		/**
        |--------------------------------------------------
        | Initially, the popover content should not be in
        | the document
        |--------------------------------------------------
        */
		expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

		/**
        |--------------------------------------------------
        | Click the trigger to open the popover
        |--------------------------------------------------
        */
		fireEvent.click(screen.getByTestId('popover-trigger'));

		/**
        |--------------------------------------------------
        | Wait for the popover content to appear
        |--------------------------------------------------
        */
		await waitFor(() => {
			expect(screen.getByTestId('popover-content')).toBeInTheDocument();
		});

		/**
        |--------------------------------------------------
        | Click the trigger again to close the popover
        |--------------------------------------------------
        */
		fireEvent.click(screen.getByTestId('popover-trigger'));

		/**
        |--------------------------------------------------
        | Wait for the popover content to be removed
        |--------------------------------------------------
        */
		await waitFor(() => {
			expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
		});
	});
});
