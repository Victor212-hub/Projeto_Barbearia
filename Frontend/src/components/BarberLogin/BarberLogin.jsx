import { useState } from "react";
import "./BarberLogin.css";

// Login temporário apenas para simular o fluxo no front-end.
// Depois o backend deve validar usuário e senha de forma segura.
const MOCK_BARBER_USERNAME = "barbeiro";
const MOCK_BARBER_PASSWORD = "123456";

function BarberLogin({ onLoginSuccess, onBackToSite }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!loginData.username || !loginData.password) {
      setErrorMessage("Preencha usuário e senha.");
      return;
    }

    const credentialsAreValid =
      loginData.username === MOCK_BARBER_USERNAME &&
      loginData.password === MOCK_BARBER_PASSWORD;

    if (!credentialsAreValid) {
      setErrorMessage("Usuário ou senha inválidos.");
      return;
    }

    setErrorMessage("");
    onLoginSuccess();
  }

  return (
    <main className="barber-login-page">
      <section className="barber-login">
        <div className="barber-login-container">
          <div className="barber-login-content">
            <button
              className="barber-login-back-button"
              type="button"
              onClick={onBackToSite}
            >
              Voltar para o site
            </button>

            <p className="barber-login-eyebrow">Área do barbeiro</p>

            <h1 className="barber-login-title">
              Acesse o painel de agendamentos.
            </h1>

            <p className="barber-login-subtitle">
              Esta tela simula o acesso interno do barbeiro. Depois, a validação
              será feita pelo backend.
            </p>

            <div className="barber-login-info">
              <strong>Acesso de teste</strong>

              <p>
                Usuário: <span>barbeiro</span>
              </p>

              <p>
                Senha: <span>123456</span>
              </p>
            </div>
          </div>

          <form className="barber-login-form" onSubmit={handleSubmit}>
            <div className="barber-login-form-header">
              <span>Painel interno</span>
              <h2>Entrar</h2>
            </div>

            <div className="barber-login-form-group">
              <label htmlFor="username">Usuário</label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Digite o usuário"
                value={loginData.username}
                onChange={handleChange}
              />
            </div>

            <div className="barber-login-form-group">
              <label htmlFor="password">Senha</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a senha"
                value={loginData.password}
                onChange={handleChange}
              />
            </div>

            <button className="barber-login-button" type="submit">
              Entrar no painel
            </button>

            {errorMessage && (
              <p className="barber-login-message">{errorMessage}</p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default BarberLogin;