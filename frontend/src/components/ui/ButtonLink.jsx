import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-ember text-white shadow-glow hover:bg-[#e57a57]',
  secondary: 'border border-white/12 bg-white/[0.045] text-canvas hover:bg-white/[0.08]',
  ghost: 'text-canvas/72 hover:bg-white/[0.05] hover:text-canvas',
};

const sizes = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

function ButtonLink({ to = '#', children, variant = 'primary', size = 'md', className = '', onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;