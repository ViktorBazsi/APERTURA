function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-10 ${className}`}>{children}</div>;
}

export default Container;