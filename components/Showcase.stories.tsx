import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

import { Button } from './buttons/Button.js';
import { FeatureCard } from './cards/FeatureCard.js';
import { QuestCard } from './cards/QuestCard.js';
import { HUDBar } from './hud/HUDBar.js';
import { HUDDivider } from './hud/HUDDivider.js';
import { HUDLabel } from './hud/HUDLabel.js';
import { RPGIcon } from './icons/RPGIcon.js';

const meta = {
  title: 'Guides/Component Showcase',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const shellStyle = {
  display: 'grid',
  gap: 24,
  width: 'min(960px, calc(100vw - 32px))',
  margin: '0 auto',
  padding: '32px 0',
} satisfies CSSProperties;

const sectionStyle = {
  display: 'grid',
  gap: 16,
  padding: 20,
  border: '1px solid var(--ns-line)',
  background: 'var(--ns-bg-1)',
} satisfies CSSProperties;

const titleStyle = {
  margin: 0,
  color: 'var(--ns-gold)',
  font: '700 13px var(--ns-font-pixel)',
} satisfies CSSProperties;

export const FullSurface: Story = {
  render: () => (
    <main style={shellStyle}>
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="play">Enter world</Button>
          <Button variant="ghost">Open guide</Button>
          <Button disabled>Locked</Button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={titleStyle}>Cards</h2>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            padding: 0,
            margin: 0,
          }}
        >
          <FeatureCard
            icon={<RPGIcon name="light" />}
            title="Tokens"
            body="Runtime values keep product surfaces aligned."
            tag="CSS"
          />
          <FeatureCard
            icon={<RPGIcon name="book" />}
            title="Docs"
            body="Typed references and live examples stay together."
            tag="Guide"
          />
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={titleStyle}>Quest States</h2>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            padding: 0,
            margin: 0,
          }}
        >
          <QuestCard gate={1} title="Foundation" body="Package surface holds." status="done" />
          <QuestCard gate={2} title="Runtime" body="Components are typed." status="active" />
          <QuestCard gate={3} title="Visuals" body="Coverage is planned." status="planned" />
          <QuestCard gate={4} title="Later" body="Future work stays visible." status="locked" />
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={titleStyle}>HUD</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1px minmax(220px, 1fr)',
            gap: 16,
            alignItems: 'stretch',
            minHeight: 64,
          }}
        >
          <HUDLabel text="HEALTH" align="center" scale={2} />
          <HUDDivider />
          <div style={{ display: 'grid', alignContent: 'center', gap: 8 }}>
            <HUDBar value={32} max={40} aria-label="Health" />
            <HUDBar value={18} max={30} fillColor="var(--ns-cyan)" aria-label="Mana" />
          </div>
        </div>
      </section>
    </main>
  ),
};
