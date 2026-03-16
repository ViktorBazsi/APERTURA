function Card({ children, className = '' }) {
  return (
    <article className={`surface h-full p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${className}`}>
      {children}
    </article>
  );
}

export default Card;
