import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import "./BookingForm.css";

import BookingFields from "./BookingFields";
import VerificationStep from "./Verification";
import SuccessStep from "./SuccessStep";

import {
  sendVerificationCode,
  verifyCode,
  createBooking,
} from "./bookingMockApi";

const DRAFT_STORAGE_KEY = "barbershop-booking-draft";

function BookingForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const savedCustomer = JSON.parse(localStorage.getItem("barbershopCustomer"));

  const [formData, setFormData] = useState({
    name: savedCustomer?.name || user?.name || "",
    phone: savedCustomer?.phone || user?.phone || "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [step, setStep] = useState("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [shouldSaveCustomer, setShouldSaveCustomer] = useState(false);

  useEffect(() => {
    const storedDraft = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);

    if (!storedDraft) {
      return;
    }

    try {
      const parsedDraft = JSON.parse(storedDraft);
      setFormData((currentData) => ({
        ...currentData,
        service: parsedDraft.service || currentData.service,
        date: parsedDraft.date || currentData.date,
        time: parsedDraft.time || currentData.time,
        notes: parsedDraft.notes || currentData.notes,
      }));
    } catch (error) {
      console.warn("Não foi possível restaurar o rascunho do agendamento.", error);
    }
  }, []);

  useEffect(() => {
    const draftToSave = {
      service: formData.service,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    };

    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftToSave));
  }, [formData.service, formData.date, formData.time, formData.notes]);

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

    if (!user) {
      window.sessionStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        })
      );

      navigate("/entrar", {
        state: { from: { pathname: location.pathname } },
        replace: false,
      });
      return;
    }

    const response = sendVerificationCode(formData.phone);

    if (!response.success) {
      setMessage(response.message);
      return;
    }

    setMessage("");
    setStep("verify");
  }

  function handleVerifyCode(event) {
    event.preventDefault();

    const verificationResponse = verifyCode(verificationCode);

    if (!verificationResponse.success) {
      setMessage(verificationResponse.message);
      return;
    }

    const bookingResponse = createBooking(formData);

    if (!bookingResponse.success) {
      setMessage(bookingResponse.message);
      return;
    }

    if (shouldSaveCustomer) {
      localStorage.setItem(
        "barbershopCustomer",
        JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        })
      );
    }

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
          <BookingFields
            formData={formData}
            message={message}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}

        {step === "verify" && (
          <VerificationStep
            phone={formData.phone}
            verificationCode={verificationCode}
            message={message}
            shouldSaveCustomer={shouldSaveCustomer}
            onCodeChange={(event) => setVerificationCode(event.target.value)}
            onSaveCustomerChange={(event) =>
              setShouldSaveCustomer(event.target.checked)
            }
            onSubmit={handleVerifyCode}
            onBack={() => {
              setMessage("");
              setStep("form");
            }}
          />
        )}

        {step === "success" && (
          <SuccessStep formData={formData} onNewBooking={handleNewBooking} />
        )}
      </div>
    </section>
  );
}

export default BookingForm;