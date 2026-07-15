import { useState } from "react";
import "./BarberArea.css";

const mockBookings = [
  {
    id: 1,
    name: "João Victor",
    phone: "(21) 99999-9999",
    service: "Corte + barba",
    date: "2026-07-15",
    time: "14:30",
    notes: "Prefere corte baixo nas laterais.",
    status: "PENDING",
  },
  {
    id: 2,
    name: "Lucas Martins",
    phone: "(21) 98888-7777",
    service: "Corte masculino",
    date: "2026-07-15",
    time: "16:00",
    notes: "",
    status: "CONFIRMED",
  },
  {
    id: 3,
    name: "Rafael Souza",
    phone: "(21) 97777-6666",
    service: "Barba",
    date: "2026-07-16",
    time: "10:30",
    notes: "Barba desenhada.",
    status: "PENDING",
  },
];

const statusLabels = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  FINISHED: "Finalizado",
};

function BarberArea({ onBackToSite }) {
  const [bookings, setBookings] = useState(mockBookings);

  function updateBookingStatus(bookingId, newStatus) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: newStatus,
          };
        }

        return booking;
      })
    );
  }

  return (
    <main className="barber-area-page">
      <section className="barber-area">
        <div className="barber-area-container">
          <div className="barber-area-header">
            <button
              className="barber-back-button"
              type="button"
              onClick={onBackToSite}
            >
              Voltar para o site
            </button>

            <p className="barber-area-eyebrow">Área do barbeiro</p>

            <h1 className="barber-area-title">
              Acompanhe os agendamentos recebidos.
            </h1>

            <p className="barber-area-subtitle">
              Esta é uma versão visual do painel. Os dados ainda são simulados
              no front-end e serão integrados ao backend depois.
            </p>
          </div>

          <div className="barber-area-panel">
            <div className="barber-area-panel-header">
              <div>
                <span className="panel-label">Painel</span>
                <h2>Agendamentos</h2>
              </div>

              <span className="panel-count">
                {bookings.length} agendamentos
              </span>
            </div>

            <div className="booking-list">
              {bookings.map((booking) => (
                <article className="barber-booking-card" key={booking.id}>
                  <div className="barber-booking-main">
                    <div>
                      <span className="booking-client-name">
                        {booking.name}
                      </span>

                      <span className="booking-client-phone">
                        {booking.phone}
                      </span>
                    </div>

                    <span
                      className={`booking-status booking-status-${booking.status.toLowerCase()}`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>

                  <div className="barber-booking-details">
                    <p>
                      <strong>Serviço:</strong> {booking.service}
                    </p>

                    <p>
                      <strong>Data:</strong> {booking.date}
                    </p>

                    <p>
                      <strong>Horário:</strong> {booking.time}
                    </p>

                    <p>
                      <strong>Observação:</strong>{" "}
                      {booking.notes || "Nenhuma observação"}
                    </p>
                  </div>

                  <div className="barber-booking-actions">
                    <button
                      type="button"
                      onClick={() =>
                        updateBookingStatus(booking.id, "CONFIRMED")
                      }
                    >
                      Confirmar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateBookingStatus(booking.id, "CANCELED")
                      }
                    >
                      Cancelar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateBookingStatus(booking.id, "FINISHED")
                      }
                    >
                      Finalizar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BarberArea;