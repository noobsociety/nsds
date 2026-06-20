import { HUDLabel } from './HUDLabel.jsx';

const meta = {
  title: 'HUD/HUDLabel',
  component: HUDLabel,
  tags: ['autodocs'],
  args: {
    text: 'HP',
    align: 'left',
    scale: 2,
    fontSize: 5,
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <div style={{ width: 160, height: 36, background: 'var(--ns-bg-2)' }}>
      <HUDLabel {...args} />
    </div>
  ),
};

export const Alignment = {
  render: () => (
    <div style={{ display: 'grid', gap: 8, width: 180 }}>
      <div style={{ height: 32, background: 'var(--ns-bg-2)' }}>
        <HUDLabel text="LEFT" align="left" scale={2} />
      </div>
      <div style={{ height: 32, background: 'var(--ns-bg-2)' }}>
        <HUDLabel text="CENTER" align="center" scale={2} />
      </div>
      <div style={{ height: 32, background: 'var(--ns-bg-2)' }}>
        <HUDLabel text="RIGHT" align="right" scale={2} />
      </div>
    </div>
  ),
};
