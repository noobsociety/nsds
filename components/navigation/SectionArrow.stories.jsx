import { SectionArrow } from './SectionArrow.jsx';

const meta = {
  title: 'Components/SectionArrow',
  component: SectionArrow,
  tags: ['autodocs'],
  args: {
    href: '#next',
    label: 'Next section',
  },
};

export default meta;

export const Default = {
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
