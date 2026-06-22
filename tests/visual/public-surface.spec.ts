import { expect, test } from '@playwright/test';

test('public landing page renders the component specimen surface', async ({ page }) => {
  await page.goto('/site/index.html');

  await expect(page).toHaveTitle('NoobSociety Design System');
  await expect(page.getByRole('heading', { name: 'NoobSociety Design System' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API reference' })).toBeVisible();

  const specimen = page.locator('.site-specimen');
  await expect(specimen).toBeVisible();

  await expect(specimen).toHaveScreenshot('component-specimen.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.03,
  });

  const metrics = await page.evaluate(() => {
    const styles = (selector: string) => {
      const node = document.querySelector(selector);
      if (!node) throw new Error(`Missing selector: ${selector}`);
      return getComputedStyle(node);
    };

    const rect = (selector: string) => {
      const node = document.querySelector(selector);
      if (!node) throw new Error(`Missing selector: ${selector}`);
      const box = node.getBoundingClientRect();
      return {
        height: Math.round(box.height),
        width: Math.round(box.width),
      };
    };

    return {
      activeBorder: styles('.ns-quest-card--active').borderLeftColor,
      doneBorder: styles('.ns-quest-card--done').borderLeftColor,
      meterFill: styles('.site-meter span').backgroundColor,
      playButtonBg: styles('.ns-button--play').backgroundColor,
      specimenBox: rect('.site-specimen'),
    };
  });

  expect(metrics).toEqual({
    activeBorder: 'rgb(253, 151, 31)',
    doneBorder: 'rgb(166, 226, 46)',
    meterFill: 'rgb(76, 175, 115)',
    playButtonBg: 'rgb(230, 219, 116)',
    specimenBox: {
      height: expect.any(Number),
      width: expect.any(Number),
    },
  });
  expect(metrics.specimenBox.width).toBeGreaterThan(420);
  expect(metrics.specimenBox.height).toBeGreaterThan(240);
});

test('static UI kit matches the stored visual surface', async ({ page }) => {
  await page.goto('/tests/visual/fixtures/ui-kit.html');

  const kit = page.locator('.visual-kit');
  await expect(kit).toBeVisible();
  await expect(page.getByRole('heading', { name: 'NSDS UI Kit' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter world' })).toBeVisible();

  await expect(kit).toHaveScreenshot('ui-kit.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.03,
  });

  const dividerColor = await page.evaluate(() => {
    const node = document.querySelector('.visual-kit__divider');
    if (!node) throw new Error('Missing visual kit divider');
    return getComputedStyle(node).backgroundColor;
  });

  expect(dividerColor).toBe('rgba(255, 255, 255, 0.18)');
});

test('public docs links resolve from the landing page', async ({ page }) => {
  await page.goto('/site/index.html');

  for (const name of ['Docs', 'API', 'Changelog']) {
    const link = page.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /.+/);
  }

  await expect(page.getByRole('link', { name: /Tutorial\s+Getting started/ })).toBeVisible();
});
