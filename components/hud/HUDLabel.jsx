const FONT = 'var(--ns-font-pixel, "Press Start 2P", monospace)';
const JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export function HUDLabel({
  text = 'Label',
  align = 'left',
  scale = 1,
  color = 'var(--ns-ink)',
  fontSize = 5,
  style,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: JUSTIFY[align] || JUSTIFY.left,
        paddingLeft: align === 'right' ? 0 : 3,
        paddingRight: align === 'left' ? 0 : 3,
        fontFamily: FONT,
        fontSize: fontSize * scale,
        color,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      {text}
    </div>
  );
}
