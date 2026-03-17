function Card({ children, className = '', ...props }) {
  return (
    <article className={`surface h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.07] md:p-8 ${className}`} {...props}>
      {children}
    </article>
  );
}

export default Card;