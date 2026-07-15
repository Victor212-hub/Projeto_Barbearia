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
  {
    id: 4,
    name: "André Lima",
    phone: "(21) 96666-5555",
    service: "Sobrancelha",
    date: "2026-07-16",
    time: "11:00",
    notes: "",
    status: "FINISHED",
  },
];

const statusLabels = {
  ALL: "Todos",
  PENDING: "Pendentes",
  CONFIRMED: "Confirmados",
  CANCELED: "Cancelados",
  FINISHED: "Finalizados",
};

const statusBadgeLabels = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  CANCELED: "Cancelado",
  FINISHED: "Finalizado",
};

const statusFilters = ["ALL", "PENDING", "CONFIRMED", "CANCELED", "FINISHED"];

function BarberArea({ onBackToSite }) {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredBookings =
    activeFilter === "ALL"
      ? bookings
      : bookings.filter((booking) => booking.status === activeFilter);

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const finishedBookings = bookings.filter(
    (booking) => booking.status === "FINISHED"
  ).length;

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

          <div className="barber-summary-grid">
            <article className="barber-summary-card">
              <span>Total</span>
              <strong>{totalBookings}</strong>
            </article>

            <article className="barber-summary-card">
              <span>Pendentes</span>
              <strong>{pendingBookings}</strong>
            </article>

            <article className="barber-summary-card">
              <span>Confirmados</span>
              <strong>{confirmedBookings}</strong>
            </article>

            <article className="barber-summary-card">
              <span>Finalizados</span>
              <strong>{finishedBookings}</strong>
            </article>
          </div>

          <div className="barber-area-panel">
            <div className="barber-area-panel-header">
              <div>
                <span className="panel-label">Painel</span>
                <h2>Agendamentos</h2>
              </div>

              <span className="panel-count">
                {filteredBookings.length} exibidos
              </span>
            </div>

            <div className="barber-filters" aria-label="Filtros de status">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  className={`barber-filter-button ${
                    activeFilter === status ? "barber-filter-button-active" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveFilter(status)}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>

            <div className="booking-list">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
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
                        {statusBadgeLabels[booking.status]}
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
                      {booking.status === "PENDING" && (
                        <>
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
                        </>
                      )}

                      {booking.status === "CONFIRMED" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              updateBookingStatus(booking.id, "FINISHED")
                            }
                          >
                            Finalizar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateBookingStatus(booking.id, "CANCELED")
                            }
                          >
                            Cancelar
                          </button>
                        </>
                      )}

                      {(booking.status === "CANCELED" ||
                        booking.status === "FINISHED") && (
                        <span className="booking-action-note">
                          Nenhuma ação disponível para este status.
                        </span>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-bookings">
                  <h3>Nenhum agendamento encontrado.</h3>
                  <p>
                    Não existem agendamentos com o status selecionado no
                    momento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BarberArea;