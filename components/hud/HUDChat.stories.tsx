import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDChat } from './HUDChat.js';

const frame = {
  width: 200,
  background: 'var(--ns-bg-2)',
  border: '1px solid var(--ns-line)',
};

const meta = {
  title: 'HUD/HUDChat',
  component: HUDChat,
  tags: ['autodocs'],
  args: {
    height: 80,
    fontSize: 4,
  },
} satisfies Meta<typeof HUDChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={frame}>
      <HUDChat {...args} />
    </div>
  ),
};

export const CustomLog: Story = {
  render: () => (
    <div style={frame}>
      <HUDChat
        messages={[
          { sender: 'Mage', color: 'var(--ns-purple)', text: 'casting now' },
          { sender: 'Tank', color: 'var(--ns-green)', text: 'hold the line' },
          { sender: 'Healer', color: 'var(--ns-cyan)', text: 'topped off' },
        ]}
      />
    </div>
  ),
};
