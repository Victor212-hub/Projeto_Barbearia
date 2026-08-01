package com.Barbearia.backend.repository;

import com.Barbearia.backend.model.BarbeiroHorario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;   

public interface BarbeiroHorarioRepository extends JpaRepository<BarbeiroHorario, Long> {
    List<BarbeiroHorario> findByBarbeiroId(Long BarbeiroId);

}
