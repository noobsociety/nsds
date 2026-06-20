import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDBar } from './HUDBar.js';

const meta = {
  title: 'HUD/HUDBar',
  component: HUDBar,
  tags: ['autodocs'],
  args: {
    value: 32,
    max: 40,
    height: 14,
  },
} satisfies Meta<typeof HUDBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <HUDBar {...args} />
    </div>
  ),
};

export const ResourceBars: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 240 }}>
      <HUDBar value={38} max={40} fillColor="var(--hud-hp-fill)" />
      <HUDBar value={19} max={30} fillColor="var(--ns-cyan)" />
      <HUDBar value={8} max={20} fillColor="var(--ns-orange)" />
    </div>
  ),
};
