import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerClient } from "../../services/authApi";
// Se quiser aproveitar o CSS do login, pode importar ele aqui ou criar um próprio
// import "./ClientRegisterPage.css"; 

function ClientRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerClient(formData);
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate("/entrar"); // Redireciona para o login após o sucesso
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "4rem auto", padding: "2rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Criar Conta</h2>
      
      {error && <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Nome Completo</label>
          <input required type="text" name="nome" value={formData.nome} onChange={handleChange} style={{ width: "100%", padding: "0.8rem", boxSizing: "border-box" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "0.8rem", boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Telefone</label>
          <input required type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) 9XXXX-XXXX" style={{ width: "100%", padding: "0.8rem", boxSizing: "border-box" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Senha</label>
          <input required type="password" name="senha" value={formData.senha} onChange={handleChange} style={{ width: "100%", padding: "0.8rem", boxSizing: "border-box" }} />
        </div>
        
        <button type="submit" disabled={loading} style={{ padding: "1rem", background: "#000", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "1rem", fontWeight: "bold" }}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
        Já tem uma conta? <Link to="/entrar" style={{ color: "#000", fontWeight: "bold" }}>Faça login</Link>
      </p>
    </div>
  );
}

export default ClientRegisterPage;