package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Barbearia.backend.repository.BarbeiroRepository;
import com.Barbearia.backend.repository.UnidadeRepository;
import com.Barbearia.backend.DTO.BarbeiroDTO;
import com.Barbearia.backend.exception.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("Unidade não encontrada"));
        Barbeiro barbeiro = new Barbeiro();
        barbeiro.setUnidade(unidade);
        barbeiro.setNome(dto.getNome());
        barbeiro.setEmail(dto.getEmail());
        barbeiro.setSenha(passwordEncoder.encode(dto.getSenha()));
        barbeiro.setDisponivel(true);

        Barbeiro salvo = Repository.save(barbeiro);
        return toDTO(salvo);
    }

    public BarbeiroDTO atualizar(Long id, BarbeiroDTO dto) {
        Barbeiro barbeiro = Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));
        if (dto.getUnidadeId() != null) {
            Unidade unidade = UnidadeRepository.findById(dto.getUnidadeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Unidade não encontrada"));
            barbeiro.setUnidade(unidade);
        }
        if (dto.getNome() != null) {
            barbeiro.setNome(dto.getNome());
        }
        if (dto.getEmail() != null) {
            barbeiro.setEmail(dto.getEmail());
        }
        if (dto.getSenha() != null) {
            barbeiro.setSenha(passwordEncoder.encode(dto.getSenha()));
        }
        if (dto.getDisponivel() != null) {
            barbeiro.setDisponivel(dto.getDisponivel());
        }

        Barbeiro atualizado = Repository.save(barbeiro);
        return toDTO(atualizado);
    }  
    public void deletar(Long id){
        Barbeiro barbeiro = Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));
        Repository.delete(barbeiro);
        
    }

    private BarbeiroDTO toDTO(Barbeiro b) {
        return new BarbeiroDTO(b.getId(), b.getUnidade().getId(), b.getNome(), b.getEmail(), null, b.getDisponivel());
    }
}
