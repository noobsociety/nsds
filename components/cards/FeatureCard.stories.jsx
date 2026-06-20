import { RPGIcon } from '../icons/RPGIcon.jsx';
import { FeatureCard } from './FeatureCard.jsx';

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  args: {
    icon: <RPGIcon name="light" />,
    title: 'World UI',
    body: 'Token-backed components for pixel-art product surfaces.',
    tag: 'Live',
  },
};

export default meta;

export const Default = {};

export const FeatureGrid = {
  render: () => (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))',
        gap: 16,
        maxWidth: 640,
        padding: 0,
        margin: 0,
      }}
    >
      <FeatureCard
        icon={<RPGIcon name="sword" />}
        title="Components"
        body="Reusable React pieces with stable class names."
        tag="React"
      />
      <FeatureCard
        icon={<RPGIcon name="void" />}
        title="Tokens"
        body="CSS custom properties for the shared visual system."
        tag="CSS"
      />
      <FeatureCard
        icon={<RPGIcon name="wind" />}
        title="Preset"
        body="Tailwind theme values mapped from NSDS tokens."
        tag="Tailwind"
      />
      <FeatureCard
        icon={<RPGIcon name="book" />}
        title="Docs"
        body="Stories and cards for product and design-system authors."
        tag="Guide"
      />
    </ul>
  ),
};
