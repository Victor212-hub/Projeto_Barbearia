export const clientMockProfile = {
  id: 1,
  name: "João Victor",
  email: "joao@email.com",
  avatarUrl: "",
  phone: "",
  phoneVerified: false,
  preferredStyle: "Corte baixo nas laterais",
  preferredService: "Corte + barba",
  nextAppointment: {
    date: "15/07/2026",
    time: "14:30",
    service: "Corte + barba",
  },
  recentAppointments: [
    {
      id: 1,
      service: "Corte masculino",
      date: "08/07/2026",
      note: "Corte bem fechado e finalizado com acabamento limpo.",
    },
    {
      id: 2,
      service: "Barba",
      date: "01/07/2026",
      note: "Barba desenhada e alinhada.",
    },
  ],
};
