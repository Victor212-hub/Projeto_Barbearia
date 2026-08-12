package com.Barbearia.backend.service;

import org.springframework.stereotype.Service;
import com.Barbearia.backend.DTO.ServicoDTO;
import com.Barbearia.backend.exception.ResourceNotFoundException;
import com.Barbearia.backend.model.Servico;
import com.Barbearia.backend.repository.ServicoRepository;
import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository repository;

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    public List<ServicoDTO> listar() {
        return repository.findAll().stream().map(this::toDTO).toList();
    }
    public List<ServicoDTO> listarDisponiveis() {
        return repository.findByDisponivelTrue().stream().map(this::toDTO).toList();
    }
    public ServicoDTO criar(ServicoDTO dto) {
        Servico servico = new Servico();
        servico.setNome(dto.getNome());
        servico.setDescricao(dto.getDescricao());
        servico.setPreco(dto.getPreco());
        servico.setDuracao(dto.getDuracao());
        servico.setDisponivel(true);

        Servico salvo = repository.save(servico);
        return toDTO(salvo);
    }

    public ServicoDTO atualizar(Long id, ServicoDTO dto) {
        Servico servico = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado"));
        if (dto.getNome() != null) {
            servico.setNome(dto.getNome());
        }
        if (dto.getDescricao() != null) {
            servico.setDescricao(dto.getDescricao());
        }
        if (dto.getPreco() != null) {
            servico.setPreco(dto.getPreco());
        }
        if (dto.getDuracao() != null) {
            servico.setDuracao(dto.getDuracao());
        }
        if (dto.getDisponivel() != null) {
            servico.setDisponivel(dto.getDisponivel());
        }

        Servico salvo = repository.save(servico);
        return toDTO(salvo);
    }
    public void deletar(Long id) {
        Servico servico = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado"));
        repository.delete(servico);
      
    }

    private ServicoDTO toDTO(Servico s) {
        return new ServicoDTO(s.getId(), s.getNome(), s.getDescricao(), s.getPreco(), s.getDuracao(), s.isDisponivel());
    }
}
