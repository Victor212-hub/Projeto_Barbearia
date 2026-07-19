package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Barbearia.backend.repository.BarbeiroRepository;
import com.Barbearia.backend.repository.UnidadeRepository;
import com.Barbearia.backend.DTO.BarbeiroDTO;
import com.Barbearia.backend.model.Barbeiro;
import com.Barbearia.backend.model.Unidade;

import java.util.List;

@Service
public class BarbeiroService {

    private final BarbeiroRepository Repository;
    private final UnidadeRepository UnidadeRepository;
    private final PasswordEncoder passwordEncoder;
    
    public BarbeiroService(BarbeiroRepository Repository, UnidadeRepository UnidadeRepository, PasswordEncoder passwordEncoder) {
        this.Repository = Repository;
        this.UnidadeRepository = UnidadeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<BarbeiroDTO> listar() {
        return Repository.findAll().stream().map(this::toDTO).toList();
    }
    public List<BarbeiroDTO> listarPorUnidade(Long unidadeId) {
        return Repository.findByUnidadeId(unidadeId).stream().map(this::toDTO).toList();
    }
    public BarbeiroDTO criar(BarbeiroDTO dto) {
        Unidade unidade = UnidadeRepository.findById(dto.getUnidadeId())
                .orElseThrow(() -> new RuntimeException("Unidade não encontrada"));
        Barbeiro barbeiro = new Barbeiro();
        barbeiro.setUnidade(unidade);
        barbeiro.setNome(dto.getNome());
        barbeiro.setEmail(dto.getEmail());
        barbeiro.setSenha(passwordEncoder.encode(dto.getSenha()));
        barbeiro.setDisponivel(true);

        Barbeiro salvo = Repository.save(barbeiro);
        return toDTO(salvo);
    }
    private BarbeiroDTO toDTO(Barbeiro b) {
        return new BarbeiroDTO(b.getId(), b.getUnidade().getId(), b.getNome(), b.getEmail(), null, b.getDisponivel());
    }
}
