package com.Barbearia.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.BarbeiroHorarioDTO;
import com.Barbearia.backend.model.Barbeiro;
import com.Barbearia.backend.model.BarbeiroHorario;
import com.Barbearia.backend.repository.BarbeiroHorarioRepository;
import com.Barbearia.backend.repository.BarbeiroRepository;

@Service
public class BarbeiroHorarioService {

    private final BarbeiroHorarioRepository repository;
    private final BarbeiroRepository barbeiroRepository;

    public BarbeiroHorarioService(BarbeiroHorarioRepository repository,BarbeiroRepository barbeiroRepository){
        this.repository = repository;
        this.barbeiroRepository = barbeiroRepository;
    }

    public List<BarbeiroHorarioDTO> ListarPorBarbeiro(Long barbeiroId){
        return repository.findByBarbeiroId(barbeiroId).stream().map(this::toDTO).toList();
    }
    public BarbeiroHorarioDTO criar(BarbeiroHorarioDTO dto){
        Barbeiro barbeiro = barbeiroRepository.findById(dto.getBarbeiroId())
        .orElseThrow(()-> new RuntimeException("Barbeiro Não Encontrado"));

        BarbeiroHorario Horario = new BarbeiroHorario();
        Horario.setBarbeiro(barbeiro);
        Horario.setDiaDaSemana(dto.getDiaDaSemana());
        Horario.setHorarioInicio(dto.getHorarioInicio());
        Horario.setHorarioFim(dto.getHorarioFim());

        BarbeiroHorario salvo = repository.save(Horario);
        return toDTO(salvo);
    }  
    private BarbeiroHorarioDTO toDTO (BarbeiroHorario h) {
        BarbeiroHorarioDTO dto = new BarbeiroHorarioDTO();
        dto.setId(h.getId());
        dto.setBarbeiroId(h.getBarbeiro().getId());
        dto.setDiaDaSemana(h.getDiaDaSemana());
        dto.setHorarioInicio(h.getHorarioInicio());
        dto.setHorarioFim(h.getHorarioFim());
        return dto;
    }
}
