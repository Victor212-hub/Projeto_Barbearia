package com.Barbearia.backend.repository;

import com.Barbearia.backend.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServicoRepository extends JpaRepository<Servico, Long> {
    List<Servico> findByDisponivelTrue();
}
