import { useState } from "react";
import "./BookingForm.css";

const serviceOptions = [
  "Corte masculino",
  "Barba",
  "Corte + barba",
  "Sobrancelha",
];

// Código temporário apenas para simular a verificação no front-end.
// Depois o backend deve gerar e validar esse código de forma segura.
const MOCK_VERIFICATION_CODE = "123456";

function BookingForm() {
  const savedCustomer = JSON.parse(localStorage.getItem("barbershopCustomer"));

  const [formData, setFormData] = useState({
    name: savedCustomer?.name || "",
    phone: savedCustomer?.phone || "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [step, setStep] = useState("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [shouldSaveCustomer, setShouldSaveCustomer] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requiredFieldsAreEmpty =
      !formData.name ||
      !formData.phone ||
      !formData.service ||
      !formData.date ||
      !formData.time;

    if (requiredFieldsAreEmpty) {
      setMessage("Preencha nome, telefone, serviço, data e horário.");
      return;
    }

    setMessage("");

    /*
      Futuro backend:
      Aqui o front-end deve chamar uma API para enviar o código.

      Exemplo futuro:
      await fetch("/api/auth/send-code", {
        method: "POST",
        body: JSON.stringify({ phone: formData.phone }),
      });

      Por enquanto, apenas simulamos indo para a etapa de verificação.
    */

    setStep("verify");
  }

  function handleVerifyCode(event) {
    event.preventDefault();

    if (verificationCode !== MOCK_VERIFICATION_CODE) {
      setMessage("Código inválido. Confira o código enviado pelo WhatsApp.");
      return;
    }

    /*
      Futuro backend:
      Aqui o front-end deve chamar uma API para validar o código.

      Exemplo futuro:
      await fetch("/api/auth/verify-code", {
        method: "POST",
        body: JSON.stringify({
          phone: formData.phone,
          code: verificationCode,
        }),
      });
    */

    if (shouldSaveCustomer) {
      localStorage.setItem(
        "barbershopCustomer",
        JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        })
      );
    }

    /*
      Futuro backend:
      Depois de validar o código, o front-end deve enviar o agendamento.

      Exemplo futuro:
      await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(formData),
      });
    */

    setMessage("");
    setStep("success");
  }

  function handleNewBooking() {
    setFormData((currentData) => ({
      name: currentData.name,
      phone: currentData.phone,
      service: "",
      date: "",
      time: "",
      notes: "",
    }));

    setVerificationCode("");
    setShouldSaveCustomer(false);
    setMessage("");
    setStep("form");
  }

  return (
    <section className="booking" id="agendamento">
      <div className="booking-container">
        <div className="booking-content">
          <p className="booking-eyebrow">Agendamento</p>

          <h2 className="booking-title">
            Escolha o serviço e solicite seu horário.
          </h2>

          <p className="booking-subtitle">
            Preencha os dados do atendimento. Antes de confirmar, vamos validar
            seu telefone para evitar agendamentos falsos.
          </p>

          <div className="booking-info">
            <strong>Verificação por WhatsApp</strong>
            <p>
              Nesta versão, o código é simulado para preparar a integração com o
              backend. Use o código de teste: <strong>123456</strong>.
            </p>
          </div>
        </div>

        {step === "form" && (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Serviço</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Selecione um serviço</option>

                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Data</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Horário</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Observação</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Alguma preferência ou observação?"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button className="booking-button" type="submit">
              Continuar para verificação
            </button>

            {message && <p className="booking-message">{message}</p>}
          </form>
        )}

        {step === "verify" && (
          <form className="booking-form" onSubmit={handleVerifyCode}>
            <div className="verification-header">
              <span className="verification-step">Etapa 2 de 2</span>

              <h3>Verifique seu telefone</h3>

              <p>
                Enviamos um código para o WhatsApp informado:
                <br />
                <strong>{formData.phone}</strong>
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="verificationCode">Código de verificação</label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                placeholder="Digite o código"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
              />
            </div>

            <label className="save-customer-option">
              <input
                type="checkbox"
                checked={shouldSaveCustomer}
                onChange={(event) =>
                  setShouldSaveCustomer(event.target.checked)
                }
              />

              <span>
                Salvar meu nome e telefone neste dispositivo para próximos
                agendamentos.
              </span>
            </label>

            <button className="booking-button" type="submit">
              Confirmar agendamento
            </button>

            <button
              className="booking-secondary-button"
              type="button"
              onClick={() => {
                setMessage("");
                setStep("form");
              }}
            >
              Voltar e corrigir dados
            </button>

            {message && <p className="booking-message">{message}</p>}
          </form>
        )}

        {step === "success" && (
          <div className="booking-form booking-success">
            <span className="success-label">Agendamento solicitado</span>

            <h3>Recebemos sua solicitação.</h3>

            <p>
              Seu telefone foi verificado e o pedido de agendamento foi
              registrado na interface. A confirmação final deve ser feita pela
              barbearia.
            </p>

            <div className="booking-summary">
              <p>
                <strong>Nome:</strong> {formData.name}
              </p>
              <p>
                <strong>Telefone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Serviço:</strong> {formData.service}
              </p>
              <p>
                <strong>Data:</strong> {formData.date}
              </p>
              <p>
                <strong>Horário:</strong> {formData.time}
              </p>
            </div>

            <button
              className="booking-button"
              type="button"
              onClick={handleNewBooking}
            >
              Fazer novo agendamento
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookingForm;