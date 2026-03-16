function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'border-white/10 bg-white/5 text-canvas/75',
    warm: 'border-ember/30 bg-ember/10 text-ember',
    gold: 'border-gold/30 bg-gold/10 text-gold',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default Badge;
