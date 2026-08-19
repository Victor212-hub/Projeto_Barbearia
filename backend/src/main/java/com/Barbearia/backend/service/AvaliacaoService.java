package com.Barbearia.backend.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.AvaliacaoDTO;
import com.Barbearia.backend.exception.BadRequestException;
import com.Barbearia.backend.exception.ResourceNotFoundException;
import com.Barbearia.backend.model.Agendamento;
import com.Barbearia.backend.model.Avaliacao;
import com.Barbearia.backend.model.StatusAgendamento;
import com.Barbearia.backend.repository.AgendamentoRepository;
import com.Barbearia.backend.repository.AvaliacaoRepository;
import com.Barbearia.backend.security.AuthenticateUser;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository repository;
    private final AgendamentoRepository agendamentoRepository;
    private final AuthenticateUser authenticateUser;
    
    public AvaliacaoService(AvaliacaoRepository repository, AgendamentoRepository agendamentoRepository,AuthenticateUser authenticateUser) {
        this.repository = repository;
        this.agendamentoRepository = agendamentoRepository;
        this.authenticateUser = authenticateUser;
    }

    public AvaliacaoDTO criar(AvaliacaoDTO dto){
        Agendamento agendamento = agendamentoRepository.findById(dto.getAgendamentoId())
            .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado"));
    
        ValidarAcessoAoAgendamento(agendamento);

        if (agendamento.getStatus() != StatusAgendamento.CONCLUIDO) {
            throw new BadRequestException("A avaliação só pode ser criada para agendamentos concluídos");
    }
        if (repository.findByAgendamentoId(dto.getAgendamentoId()).isPresent()) {
            throw new BadRequestException("A avaliação para este agendamento já foi criada");
    }
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setAgendamento(agendamento);
        avaliacao.setNota(dto.getNota());
        avaliacao.setComentario(dto.getComentario());
        avaliacao.setCriacao(LocalDateTime.now());

        Avaliacao salva = repository.save(avaliacao);
        return toDTO(salva);
    }

    private void ValidarAcessoAoAgendamento(Agendamento agendamento) {
        if (authenticateUser.isAdmin()) return;
        String email = authenticateUser.getEmail();
        boolean ehOCliente = agendamento.getCliente().getEmail().equals(email);
        if(!ehOCliente){
            throw new BadRequestException("Você só pode avaliar seus próprios agendamentos");
        }
    }
    public AvaliacaoDTO BuscarPorAgendamentoId(Long agendamentoId){
        return repository.findByAgendamentoId(agendamentoId)
           .map(this::toDTO)
            .orElseThrow(() -> new ResourceNotFoundException("Avaliação não encontrada para o agendamento: " + agendamentoId));
    }
    private AvaliacaoDTO toDTO(Avaliacao a) {
        AvaliacaoDTO dto = new AvaliacaoDTO();
        dto.setId(a.getId());
        dto.setAgendamentoId(a.getAgendamento().getId());
        dto.setNota(a.getNota());
        dto.setComentario(a.getComentario());
        dto.setCriacao(a.getCriacao());
        return dto;
    }
}
