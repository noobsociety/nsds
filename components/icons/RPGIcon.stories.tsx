import type { Meta, StoryObj } from '@storybook/react-vite';

import { RPGIcon, icons } from './RPGIcon.js';
import type { RPGIconName } from './RPGIcon.js';
import { rpgIconGroups } from './registry.js';

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

export const ByCategory: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
      {Object.entries(rpgIconGroups).map(([group, names]) => (
        <section key={group} style={{ display: 'grid', gap: 8 }}>
          <h3
            style={{
              margin: 0,
              color: 'var(--ns-gold)',
              font: '700 11px var(--ns-font-pixel)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {group}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(names as readonly RPGIconName[]).map((name) => (
              <div
                key={name}
                title={name}
                style={{
                  display: 'grid',
                  justifyItems: 'center',
                  gap: 4,
                  width: 64,
                  padding: 8,
                  background: 'var(--ns-bg-2)',
                  border: '1px solid var(--ns-line)',
                  color: 'var(--ns-ink-dim)',
                  font: '600 9px var(--ns-font-body)',
                }}
              >
                <RPGIcon name={name} size={28} />
                <span
                  style={{
                    maxWidth: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
