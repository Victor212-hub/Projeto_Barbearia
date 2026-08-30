package com.Barbearia.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.BarbeiroHorarioDTO;
import com.Barbearia.backend.exception.BadRequestException;
import com.Barbearia.backend.exception.ResourceNotFoundException;
import com.Barbearia.backend.model.Barbeiro;
import com.Barbearia.backend.model.BarbeiroHorario;
import com.Barbearia.backend.repository.BarbeiroHorarioRepository;
import com.Barbearia.backend.repository.BarbeiroRepository;
import com.Barbearia.backend.security.AuthenticateUser;

@Service
public class BarbeiroHorarioService {

    private final BarbeiroHorarioRepository repository;
    private final BarbeiroRepository barbeiroRepository;
    private final AuthenticateUser authenticateUser;

    public BarbeiroHorarioService(BarbeiroHorarioRepository repository,BarbeiroRepository barbeiroRepository,AuthenticateUser authenticateUser) {
        this.repository = repository;
        this.barbeiroRepository = barbeiroRepository;
        this.authenticateUser = authenticateUser;
    }

    public List<BarbeiroHorarioDTO> ListarPorBarbeiro(Long barbeiroId){
        return repository.findByBarbeiroId(barbeiroId).stream().map(this::toDTO).toList();
    }
    public BarbeiroHorarioDTO criar(BarbeiroHorarioDTO dto){
        Barbeiro barbeiro = barbeiroRepository.findById(dto.getBarbeiroId())
        .orElseThrow(()-> new ResourceNotFoundException("Barbeiro Não Encontrado"));

        validarPermissaoSobreBarbeiro(barbeiro);

        BarbeiroHorario Horario = new BarbeiroHorario();
        Horario.setBarbeiro(barbeiro);
        Horario.setDiaDaSemana(dto.getDiaDaSemana());
        Horario.setHorarioInicio(dto.getHorarioInicio());
        Horario.setHorarioFim(dto.getHorarioFim());

        BarbeiroHorario salvo = repository.save(Horario);
        return toDTO(salvo);
    }  

    public BarbeiroHorarioDTO atualizar(Long id, BarbeiroHorarioDTO dto) {
        BarbeiroHorario horarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horário não encontrado com o ID: " + id));

        Barbeiro barbeiro = barbeiroRepository.findById(dto.getBarbeiroId())
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado com o ID: " + dto.getBarbeiroId()));

        validarPermissaoSobreBarbeiro(barbeiro);

        horarioExistente.setBarbeiro(barbeiro);
        horarioExistente.setDiaDaSemana(dto.getDiaDaSemana());
        horarioExistente.setHorarioInicio(dto.getHorarioInicio());
        horarioExistente.setHorarioFim(dto.getHorarioFim());

        BarbeiroHorario atualizado = repository.save(horarioExistente);
        return toDTO(atualizado);
    }

    public void deletar(Long id) {
        BarbeiroHorario horarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horário não encontrado com o ID: " + id));
        repository.delete(horarioExistente);
    }

      private void validarPermissaoSobreBarbeiro(Barbeiro barbeiro) {
        if (authenticateUser.isAdmin()) return;

        if (!barbeiro.getEmail().equals(authenticateUser.getEmail())) {
            throw new BadRequestException("Você só pode gerenciar seu próprio horário");
        }
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
