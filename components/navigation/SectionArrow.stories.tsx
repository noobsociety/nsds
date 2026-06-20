import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionArrow } from './SectionArrow.js';

const meta = {
  title: 'Components/SectionArrow',
  component: SectionArrow,
  tags: ['autodocs'],
  args: {
    href: '#next',
    label: 'Next section',
  },
} satisfies Meta<typeof SectionArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: 220,
        height: 140,
        background: 'var(--ns-bg-2)',
        border: '1px solid var(--ns-line)',
      }}
    >
      <SectionArrow {...args} />
    </div>
  ),
};
