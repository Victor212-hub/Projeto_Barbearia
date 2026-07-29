package com.Barbearia.backend.service;

import com.Barbearia.backend.DTO.UnidadeDTO;
import com.Barbearia.backend.model.Unidade;
import com.Barbearia.backend.repository.UnidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadeService {

    private final UnidadeRepository repository;

    // Spring injeta o repository automaticamente aqui (Injeção de Dependência)
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

    private UnidadeDTO toDTO(Unidade u) {
        return new UnidadeDTO(u.getId(), u.getNome(), u.getEndereço(),
                u.getLatitude(), u.getLongitude(), u.getDescrição());
    }
}
