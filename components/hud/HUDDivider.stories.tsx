import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDDivider } from './HUDDivider.js';

const frameStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: 12,
  width: 260,
  height: 80,
  padding: 12,
  background: 'var(--ns-bg-2)',
  border: '1px solid var(--ns-line)',
};

const meta = {
  title: 'HUD/HUDDivider',
  component: HUDDivider,
  tags: ['autodocs'],
  args: {
    direction: 'vertical',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof HUDDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: (args) => (
    <div style={frameStyle}>
      <div style={{ flex: 1 }} />
      <HUDDivider {...args} />
      <div style={{ flex: 1 }} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div style={{ ...frameStyle, flexDirection: 'column' }}>
      <div style={{ flex: 1 }} />
      <HUDDivider {...args} />
      <div style={{ flex: 1 }} />
    </div>
  ),
};
