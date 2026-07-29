package com.Barbearia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Barbearia.backend.model.Agendamento;
import java.util.List;
import java.time.LocalDateTime;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClienteId(Long clienteId);
    List<Agendamento> findByBarbeiroId(Long barbeiroId);

    List<Agendamento> findByBarbeiroIdAndDataHoraBetween(Long barbeiroId, LocalDateTime start, LocalDateTime end);
}
