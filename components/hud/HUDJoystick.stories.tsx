import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDJoystick } from './HUDJoystick.js';

const meta = {
  title: 'HUD/HUDJoystick',
  component: HUDJoystick,
  tags: ['autodocs'],
  args: {
    size: 80,
    thumbSize: 0.32,
  },
} satisfies Meta<typeof HUDJoystick>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 16, background: 'var(--ns-bg-2)' }}>
      <HUDJoystick {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: { size: 120 },
  render: (args) => (
    <div style={{ padding: 16, background: 'var(--ns-bg-2)' }}>
      <HUDJoystick {...args} />
    </div>
  ),
};
