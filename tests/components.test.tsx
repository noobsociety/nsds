import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Button,
  FeatureCard,
  HUDBar,
  HUDDivider,
  HUDLabel,
  QuestCard,
  RPGIcon,
  SectionArrow,
} from '../index.js';
import {
  nsClientRelease,
  nsClientTargets,
  questStatus,
  rpgIconGroups,
  rpgIconNames,
} from '../client/index.js';

describe('Button', () => {
  it('renders stable class names for variants and sizes', () => {
    render(
      <Button variant="ghost" size="lg">
        View source
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'View source' });
    expect(button).toHaveClass('ns-button', 'ns-button--ghost', 'ns-button--lg');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('falls back for invalid variant and size values', () => {
    render(
      <Button variant={'missing' as never} size={'huge' as never}>
        Play
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Play' });
    expect(button).toHaveClass('ns-button--play', 'ns-button--md');
  });

  it('renders disabled links with accessibility attributes', () => {
    render(
      <Button href="/docs" disabled>
        Docs
      </Button>,
    );

    const link = screen.getByText('Docs');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).not.toHaveAttribute('href');
  });
});

describe('FeatureCard', () => {
  it('renders class names, tag copy, and hidden icon slot', () => {
    render(
      <ul>
        <FeatureCard
          icon={<RPGIcon name="sword" />}
          title="Components"
          body="Stable React pieces."
          tag="React"
        />
      </ul>,
    );

    const card = screen.getByRole('listitem');
    expect(card).toHaveClass('ns-card', 'ns-feature-card');
    expect(screen.getByText('Components')).toHaveClass('ns-feature-card__title');
    expect(screen.getByText('React')).toHaveClass('ns-tag', 'ns-feature-card__tag');
    expect(card.querySelector('.ns-feature-card__icon')).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('QuestCard', () => {
  it('renders status variants and labels', () => {
    render(
      <ul>
        <QuestCard gate={2} title="HUD" body="Build the HUD layer." status="active" />
      </ul>,
    );

    const card = screen.getByRole('listitem');
    expect(card).toHaveClass('ns-quest-card', 'ns-quest-card--active');
    expect(screen.getByText('BUILDING')).toHaveClass('ns-status-pill');
    expect(card.querySelector('.ns-quest-card__icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('falls back to locked status for invalid status values', () => {
    render(
      <ul>
        <QuestCard gate={9} title="Later" body="Future work." status={'missing' as never} />
      </ul>,
    );

    expect(screen.getByRole('listitem')).toHaveClass('ns-quest-card--locked');
    expect(screen.getByText('LATER')).toBeInTheDocument();
  });
});

describe('HUD components', () => {
  it('renders HUDBar as a meter with clamped value attributes', () => {
    render(<HUDBar value={48} max={40} aria-label="Health" />);

    const meter = screen.getByRole('meter', { name: 'Health' });
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '40');
    expect(meter).toHaveAttribute('aria-valuenow', '40');
    expect(meter).toHaveTextContent('48 / 40');
  });

  it('renders HUDDivider orientation attributes', () => {
    render(<HUDDivider direction="horizontal" />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(separator).toHaveStyle({ width: '100%', height: '1px' });
  });

  it('passes attributes through HUDLabel', () => {
    render(<HUDLabel text="MP" align="center" data-testid="label" />);

    const label = screen.getByTestId('label');
    expect(label).toHaveTextContent('MP');
    expect(label).toHaveStyle({ justifyContent: 'center' });
  });
});

describe('RPGIcon', () => {
  it('renders valid icons and exposes the icon registry', () => {
    const { container } = render(<RPGIcon name="void" size={32} />);

    expect(RPGIcon.icons).toContain('void');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('client registries', () => {
  it('exposes renderer-neutral 21.06 metadata', () => {
    expect(nsClientRelease).toBe('21.06');
    expect(nsClientTargets).toEqual(['web', 'game']);
    expect(questStatus.active).toMatchObject({
      className: 'ns-quest-card--active',
      label: 'BUILDING',
    });
    expect(rpgIconGroups.weapons).toContain('sword');
    expect(rpgIconNames).toEqual(RPGIcon.icons);
  });
});

describe('SectionArrow', () => {
  it('renders a labelled link with the base class', () => {
    render(<SectionArrow href="#next" label="Next section" />);

    const link = screen.getByRole('link', { name: 'Next section' });
    expect(link).toHaveClass('ns-section-arrow');
    expect(link).toHaveAttribute('href', '#next');
  });
});
