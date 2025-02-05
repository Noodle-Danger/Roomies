interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  value?: number | string;
  readOnly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  className,
  style,
  placeholder,
  value,
  readOnly,
  onChange,
}: InputProps) => {
  return (
    <input
      className={className}
      style={style}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};

export default Input;
