import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	title: 'Components/ArrowButton',
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	args: {
		isOpen: true,
	},
};
