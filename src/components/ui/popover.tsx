'use client';

/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/**
|--------------------------------------------------
| Custom imports
|--------------------------------------------------
*/
import { cn } from '@/lib/utils';

/**
|--------------------------------------------------
| Popover
|--------------------------------------------------
*/
function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-testid="popover" data-slot="popover" {...props} />;
}

/**
|--------------------------------------------------
| Popover trigger
|--------------------------------------------------
*/
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-testid="popover-trigger" data-slot="popover-trigger" {...props} />;
}

/**
|--------------------------------------------------
| Popover content
|--------------------------------------------------
*/
function PopoverContent({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	/**
	|--------------------------------------------------
	| Rendered view
	|--------------------------------------------------
	*/
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align={align}
				sideOffset={sideOffset}
				data-slot="popover-content"
				data-testid="popover-content"
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
					className
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

/**
|--------------------------------------------------
| Popover anchor
|--------------------------------------------------
*/
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-testid="anchor" data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
