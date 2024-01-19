const Button = ({ children, type, sx, className, isDisabled }) => {
  return (
    <button type={type} style={sx} className={className} disabled={isDisabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'submit',
  isDisabled: false,
};

export default Button;
