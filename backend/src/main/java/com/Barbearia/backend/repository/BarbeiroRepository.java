package com.Barbearia.backend.repository;

import com.Barbearia.backend.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {
    Optional<Barbeiro> findByEmail(String email);
    List<Barbeiro> findByUnidadeId(Long unidadeId);
}