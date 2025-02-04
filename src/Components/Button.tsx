interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

// *  or react function component with props: React.FC<ButtonProps>
const Button= ({
  className,
  style,
  onClick,
  children,
} : ButtonProps) => {
  return (
    <button
      className={className}
      style={style}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.transform = 'translateY(2px)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = `
                      0 10px 25px -3px rgba(0, 0, 0, 0.3),
                      0 4px 6px -2px rgba(0, 0, 0, 0.6),
                      0 20px 25px -5px rgba(0, 0, 0, 0.2),
                      inset 0 2px 2px rgba(255, 255, 255, 0.95)
                      `;
        e.currentTarget.style.transform = 'none';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
                      0 10px 25px -3px rgba(0, 0, 0, 0.3),
                      0 4px 6px -2px rgba(0, 0, 0, 0.6),
                      0 20px 25px -5px rgba(0, 0, 0, 0.2),
                      inset 0 2px 2px rgba(255, 255, 255, 0.95)
                      `;
        e.currentTarget.style.transform = 'none';
      }}
      // ? clicking trigger - route back with props
      onClick={onClick}
    >
      // ? button attributes
      {children}
    </button>
  );
};

export default Button;
