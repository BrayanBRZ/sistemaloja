import { useNavigate } from "react-router-dom";

function FormHeader({ headerTitle, buttonListLink, buttonAddLink, onReset = () => { } }) {
  const navigate = useNavigate();

  return (
    <div className="form-header">
      <div className="form-buttons">
        {buttonListLink && (
          <button
            type="button"
            className="button button-listar"
            onClick={() => { navigate(buttonListLink); }}
          >
            <span className="material-symbols-outlined">clear_all</span>Listar
          </button>
        )}
        {buttonAddLink && (
          <button
            type="button"
            className="button button-incluir"
            onClick={() => {
              onReset();
              navigate(buttonAddLink);
            }}
          >
            <span className="material-symbols-outlined">add</span>Incluir
          </button>
        )}
      </div>
      <div className="header">{headerTitle}</div>
    </div >
  );
}

export default FormHeader