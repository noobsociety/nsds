import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDPanel } from './HUDPanel.js';

const meta = {
  title: 'HUD/HUDPanel',
  component: HUDPanel,
  tags: ['autodocs'],
  args: {
    variant: 'dark',
    radius: 4,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light', 'clear'],
    },
  },
} satisfies Meta<typeof HUDPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const fill = {
  display: 'grid',
  placeItems: 'center',
  height: '100%',
  color: 'var(--ns-ink)',
  fontFamily: 'var(--ns-font-pixel)',
  fontSize: 8,
};

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 200, height: 100 }}>
      <HUDPanel {...args}>
        <div style={fill}>PANEL</div>
      </HUDPanel>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: 'grid', gap: 12, width: 200, padding: 12, background: 'var(--ns-bg-0)' }}
    >
      {(['dark', 'light', 'clear'] as const).map((v) => (
        <div key={v} style={{ height: 56 }}>
          <HUDPanel variant={v} radius={4}>
            <div style={fill}>{v}</div>
          </HUDPanel>
        </div>
      ))}
    </div>
  ),
};
