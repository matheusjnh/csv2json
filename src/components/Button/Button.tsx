import './styles.css';

interface ButtonProps {
  text: string;
  color: 'primary' | 'warning';
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ text, color, onClickHandler }: ButtonProps) {
  return (
    <button onClick={onClickHandler} className={`c-btn c-btn--${color}`}>
      {text}
    </button>
  );
}
