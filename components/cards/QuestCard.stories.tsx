import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuestCard } from './QuestCard.js';

const meta = {
  title: 'Components/QuestCard',
  component: QuestCard,
  tags: ['autodocs'],
  args: {
    gate: 1,
    title: 'Foundation',
    body: 'Package exports, tokens, and component primitives hold.',
    status: 'done',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['done', 'active', 'planned', 'locked'],
    },
  },
} satisfies Meta<typeof QuestCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Statuses: Story = {
  render: () => (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))',
        gap: 16,
        maxWidth: 720,
        padding: 0,
        margin: 0,
      }}
    >
      <QuestCard gate={1} title="Foundation" body="Package surface holds." status="done" />
      <QuestCard gate={2} title="HUD" body="Game-layer UI is in progress." status="active" />
      <QuestCard gate={3} title="Map" body="World components are planned." status="planned" />
      <QuestCard gate={4} title="Inventory" body="Later systems stay locked." status="locked" />
    </ul>
  ),
};
