import type { Meta, StoryObj } from '@storybook/react-vite';

import { HUDTabWindow } from './HUDTabWindow.js';

const meta = {
  title: 'HUD/HUDTabWindow',
  component: HUDTabWindow,
  tags: ['autodocs'],
  args: {
    tabHeight: 14,
    tabMinWidth: 48,
    tabFontSize: 3.5,
    tabAlign: 'left',
  },
  argTypes: {
    tabAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof HUDTabWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

const box = {
  width: 220,
  height: 120,
  background: 'var(--ns-bg-2)',
  border: '1px solid var(--ns-line)',
};

const panel = (text: string) => (
  <div
    style={{
      padding: 8,
      color: 'var(--ns-ink-dim)',
      fontFamily: 'var(--ns-font-body)',
      fontSize: 8,
    }}
  >
    {text}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <div style={box}>
      <HUDTabWindow {...args} />
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={box}>
      <HUDTabWindow
        tabs={[
          { id: 'stats', label: 'STATS', content: panel('STR 12 · DEX 9 · INT 7') },
          { id: 'bag', label: 'BAG', content: panel('Potion x3 · Ether x1') },
          { id: 'map', label: 'MAP', content: panel('Zone: Verdant Hollow') },
        ]}
      />
    </div>
  ),
};
