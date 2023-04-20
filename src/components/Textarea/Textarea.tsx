import './styles.css';

interface TextareaProps {
  title: string;
  value: string;
  setValue?: (value: string) => void;
}

export function Textarea({ title, value, setValue }: TextareaProps) {
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setValue) setValue(e.target.value);
  };

  return (
    <div className="c-textarea__container">
      <textarea
        className="c-textarea__input"
        value={value}
        onChange={onChangeHandler}
      ></textarea>
      <span className="c-textarea__title">{title}</span>
    </div>
  );
}
