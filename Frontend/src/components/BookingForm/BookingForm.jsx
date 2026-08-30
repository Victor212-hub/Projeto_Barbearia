import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./BookingForm.css";

import BookingFields from "./BookingFields";
import SuccessStep from "./SuccessStep";

import { getServicos, getBarbeiros, createBooking } from "../../services/bookingApi";

const DRAFT_STORAGE_KEY = "barbershop-booking-draft";
const DEFAULT_UNIDADE_ID = Number(import.meta.env.VITE_DEFAULT_UNIDADE_ID || 1);

function BookingForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    unidadeId: String(DEFAULT_UNIDADE_ID),
    barbeiroId: "",
    servicoId: "",
    date: "",
    time: "",
    notes: "",
  });

  const [servicos, setServicos] = useState([]);
  const [barbeiros, setBarbeiros] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [step, setStep] = useState("form");
  const [message, setMessage] = useState("");
  const [, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    async function loadOptions() {
      setIsLoadingOptions(true);
      try {
        const servicosData = await getServicos();
        setServicos(servicosData || []);
      } catch (error) {
        setMessage(error.message || "Não foi possível carregar as opções de agendamento.");
      } finally {
        setIsLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    async function loadBarbeiros() {
      try {
        const barbeirosData = await getBarbeiros(DEFAULT_UNIDADE_ID);
        setBarbeiros(barbeirosData || []);
      } catch (error) {
        setMessage(error.message || "Não foi possível carregar os barbeiros.");
      }
    }

    loadBarbeiros();
  }, []);

  useEffect(() => {
    async function restoreDraft() {
      const storedDraft = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);

      if (!storedDraft) {
        return;
      }

      try {
        const parsedDraft = JSON.parse(storedDraft);
        setFormData((currentData) => ({
          ...currentData,
          ...parsedDraft,
        }));
      } catch (error) {
        console.warn("Não foi possível restaurar o rascunho do agendamento.", error);
      }
    }

    restoreDraft();
  }, []);

  useEffect(() => {
    const draftToSave = {
      unidadeId: formData.unidadeId,
      barbeiroId: formData.barbeiroId,
      servicoId: formData.servicoId,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    };

    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftToSave));
  }, [
    formData.unidadeId,
    formData.barbeiroId,
    formData.servicoId,
    formData.date,
    formData.time,
    formData.notes,
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
      ...(name === "unidadeId" ? { barbeiroId: "" } : {}),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requiredFieldsAreEmpty =
      !formData.unidadeId ||
      !formData.barbeiroId ||
      !formData.servicoId ||
      !formData.date ||
      !formData.time;

    if (requiredFieldsAreEmpty) {
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!user) {
      navigate("/entrar", {
        state: { from: { pathname: location.pathname } },
        replace: false,
      });
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const dataHora = `${formData.date}T${formData.time}:00`;

      const unidadeIdParaEnviar = Number(formData.unidadeId || DEFAULT_UNIDADE_ID);

      const booking = await createBooking({
        clienteId: user.id,
        barbeiroId: Number(formData.barbeiroId),
        unidadeId: unidadeIdParaEnviar,
        dataHora,
        observacoes: formData.notes,
        servicosIds: [Number(formData.servicoId)],
      });

      setConfirmedBooking(booking);
      setStep("success");
    } catch (error) {
      setMessage(error.message || "Não foi possível criar o agendamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNewBooking() {
    setFormData({
      unidadeId: String(DEFAULT_UNIDADE_ID),
      barbeiroId: "",
      servicoId: "",
      date: "",
      time: "",
      notes: "",
    });

    setMessage("");
    setConfirmedBooking(null);
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
            Preencha os dados do atendimento. A confirmação final é feita pela barbearia.
          </p>
        </div>

        {step === "form" && (
          <BookingFields
            formData={formData}
            message={message}
            servicos={servicos}
            barbeiros={barbeiros}
            isLoadingOptions={isLoadingOptions}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}

        {step === "success" && confirmedBooking && (
          <SuccessStep booking={confirmedBooking} onNewBooking={handleNewBooking} />
        )}
      </div>
    </section>
  );
}

export default BookingForm;