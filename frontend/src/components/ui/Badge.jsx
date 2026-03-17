function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'border-white/10 bg-white/[0.05] text-canvas/72',
    warm: 'border-ember/25 bg-ember/10 text-ember',
    gold: 'border-gold/25 bg-gold/10 text-gold',
  };

  return (
    <span className={`inline-flex rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.24em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default Badge;