export function HUDDivider({
  direction = 'vertical',
  color = 'var(--ns-line)',
  style,
}) {
  const isVertical = direction === 'vertical';

  return (
    <div
      style={{
        width: isVertical ? '1px' : '100%',
        height: isVertical ? '100%' : '1px',
        background: color,
        flexShrink: 0,
        alignSelf: 'stretch',
        ...style,
      }}
    />
  );
}
