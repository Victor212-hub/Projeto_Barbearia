package com.Barbearia.backend.service;

import com.Barbearia.backend.DTO.UnidadeDTO;
import com.Barbearia.backend.exception.ResourceNotFoundException;
import com.Barbearia.backend.model.Unidade;
import com.Barbearia.backend.repository.UnidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadeService {

    private final UnidadeRepository repository;

    
    public UnidadeService(UnidadeRepository repository) {
        this.repository = repository;
    }

    public List<UnidadeDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UnidadeDTO criar(UnidadeDTO dto) {
        Unidade unidade = new Unidade();
        unidade.setNome(dto.getNome());
        unidade.setEndereço(dto.getEndereco());
        unidade.setLatitude(dto.getLatitude());
        unidade.setLongitude(dto.getLongitude());
        unidade.setDescrição(dto.getDescrição());

        Unidade salva = repository.save(unidade);
        return toDTO(salva);
    }

    public UnidadeDTO atualizar(Long id, UnidadeDTO dto) {
        Unidade unidade = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unidade não encontrada"));
        if (dto.getNome() != null) {
            unidade.setNome(dto.getNome());
        }
        if (dto.getEndereco() != null) {
            unidade.setEndereço(dto.getEndereco());
        }
        if (dto.getLatitude() != null) {
            unidade.setLatitude(dto.getLatitude());
        }
        if (dto.getLongitude() != null) {
            unidade.setLongitude(dto.getLongitude());
        }
        if (dto.getDescrição() != null) {
            unidade.setDescrição(dto.getDescrição());
        }

        Unidade salva = repository.save(unidade);
        return toDTO(salva);
    }

    public UnidadeDTO deletar(Long id) {
        Unidade unidade = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Unidade não encontrada"));
        repository.delete(unidade);
        return toDTO(unidade);
    }

    private UnidadeDTO toDTO(Unidade u) {
        return new UnidadeDTO(u.getId(), u.getNome(), u.getEndereço(),
                u.getLatitude(), u.getLongitude(), u.getDescrição());
    }
}
