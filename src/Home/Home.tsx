import './styles.css';

export function Home() {
  return (
    <div className="l-page">
      <div className="l-header">
        <div className="l-header__content">
          <h1 className="l-header__title">CSV to JSON Converter</h1>
        </div>
      </div>

      <div className="l-content">
        <h1>Content</h1>
      </div>

      <div className="l-footer">
        <div className="l-footer__content">
          <h1>Footer</h1>
        </div>
      </div>
    </div>
  );
}
