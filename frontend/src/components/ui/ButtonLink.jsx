import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-ember text-white hover:bg-[#e57a57] shadow-glow',
  secondary: 'border border-white/15 bg-white/5 text-canvas hover:bg-white/10',
  ghost: 'text-canvas/75 hover:text-canvas',
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
      className={`inline-flex items-center gap-2 rounded-full font-medium transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
