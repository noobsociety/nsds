import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDMinimap } from './HUDMinimap.js';

const meta = {
  title: 'HUD/HUDMinimap',
  component: HUDMinimap,
  tags: ['autodocs'],
  args: {
    framed: true,
  },
} satisfies Meta<typeof HUDMinimap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 120, height: 90 }}>
      <HUDMinimap {...args} />
    </div>
  ),
};

export const Unframed: Story = {
  args: { framed: false },
  render: (args) => (
    <div style={{ width: 120, height: 90 }}>
      <HUDMinimap {...args} />
    </div>
  ),
};
