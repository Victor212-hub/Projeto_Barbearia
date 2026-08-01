import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";
import BookingForm from "../../components/BookingForm/BookingForm";

const DRAFT_STORAGE_KEY = "barbershop-booking-draft";

function BookingPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const savedDraft = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);

    if (savedDraft) {
      try {
        setDraft(JSON.parse(savedDraft));
      } catch (error) {
        console.warn("Não foi possível restaurar o rascunho de agendamento.", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!draft) {
      return;
    }

    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  return (
    <div>
      {user && (
        <section style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: 0, fontWeight: 600 }}>Cliente autenticado</p>
          <p style={{ margin: "0.25rem 0 0" }}>{user.name}</p>
          <p style={{ margin: "0.25rem 0 0" }}>{user.email}</p>
        </section>
      )}

      <BookingForm />
    </div>
  );
}

export default BookingPage;
