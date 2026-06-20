import type { Meta, StoryObj } from '@storybook/react-vite';

import { RPGIcon, icons } from './RPGIcon.js';

const meta = {
  title: 'Components/RPGIcon',
  component: RPGIcon,
  tags: ['autodocs'],
  args: {
    name: 'sword',
    size: 32,
  },
  argTypes: {
    name: {
      control: 'select',
      options: icons,
    },
    size: {
      control: { type: 'range', min: 16, max: 64, step: 2 },
    },
  },
} satisfies Meta<typeof RPGIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, minmax(64px, 1fr))',
        gap: 12,
        maxWidth: 520,
      }}
    >
      {icons.map((name) => (
        <div
          key={name}
          style={{
            display: 'grid',
            justifyItems: 'center',
            gap: 8,
            padding: 12,
            background: 'var(--ns-bg-2)',
            border: '1px solid var(--ns-line)',
            color: 'var(--ns-ink-dim)',
            font: '600 11px var(--ns-font-body)',
          }}
        >
          <RPGIcon name={name} size={28} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};
