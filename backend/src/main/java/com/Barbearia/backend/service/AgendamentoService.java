package com.Barbearia.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.AgendamentoRequestDTO;
import com.Barbearia.backend.DTO.AgendamentoResponseDTO;
import com.Barbearia.backend.DTO.ServicoDTO;
import com.Barbearia.backend.exception.BadRequestException;
import com.Barbearia.backend.exception.ResourceNotFoundException;
import com.Barbearia.backend.repository.*;
import com.Barbearia.backend.security.AuthenticateUser;
import com.Barbearia.backend.model.*;

@Service
public class AgendamentoService {
    

    private final AgendamentoRepository repository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final UnidadeRepository unidadeRepository;
    private final ServicoRepository servicoRepository;
    private final AuthenticateUser authenticateUser;

    public AgendamentoService(AgendamentoRepository repository, ClienteRepository clienteRepository,
                              BarbeiroRepository barbeiroRepository, UnidadeRepository unidadeRepository,
                              ServicoRepository servicoRepository, AuthenticateUser authenticateUser) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.unidadeRepository = unidadeRepository;
        this.servicoRepository = servicoRepository;
        this.authenticateUser = authenticateUser;
    }
    public List<AgendamentoResponseDTO> listarTodos(){
        return repository.findAll().stream().map(this::toDTO).toList();
    }
    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));
        Barbeiro barbeiro = barbeiroRepository.findById(dto.getBarbeiroId())
                .orElseThrow(() -> new ResourceNotFoundException("Barbeiro não encontrado"));
        Unidade unidade = unidadeRepository.findById(dto.getUnidadeId())
                .orElseThrow(() -> new ResourceNotFoundException("Unidade não encontrada"));

               List<Servico> servicos = dto.getServicosIds().stream()
                .map(id -> servicoRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Serviço não encontrado: " + id)))
                .toList();

                int duracaoTotalMin = servicos.stream().mapToInt(Servico::getDuracao).sum();

                LocalDateTime inicio = dto.getDataHora();
                LocalDateTime fim = inicio.plusMinutes(duracaoTotalMin);

                VerificarConflitoDeHorario(barbeiro.getId(), inicio, fim);

                Agendamento agendamento = new Agendamento();
                agendamento.setCliente(cliente);
                agendamento.setBarbeiro(barbeiro);
                agendamento.setUnidade(unidade);
                agendamento.setDataHora(inicio);
                agendamento.setStatus(StatusAgendamento.PENDENTE);
                agendamento.setObservacoes(dto.getObservacoes());
                agendamento.setServicos(servicos);

                Agendamento salvo = repository.save(agendamento);
                return toDTO(salvo);
    }
    private void VerificarConflitoDeHorario(Long BarbeiroId, LocalDateTime inicio, LocalDateTime fim) {
        List<Agendamento> possiveisConflitos = repository.findByBarbeiroIdAndDataHoraBetween(
        BarbeiroId,inicio.minusHours(4), fim.plusHours(4));

        boolean TemConflito = possiveisConflitos.stream()
        .filter(a -> a.getStatus() != StatusAgendamento.CANCELADO)
        .anyMatch(a -> SeSobrepoe(a,inicio,fim));

        if (TemConflito) {
            throw new BadRequestException("O barbeiro já possui um agendamento nesse horário.");
        }
    }

    private boolean SeSobrepoe(Agendamento Existente,LocalDateTime NovoInicio, LocalDateTime novoFim){
        int duracaoExistente = Existente.getServicos().stream().mapToInt(Servico::getDuracao).sum();
        LocalDateTime ExistenteInicio = Existente.getDataHora();
        LocalDateTime ExistenteFim = ExistenteInicio.plusMinutes(duracaoExistente);

        return NovoInicio.isBefore(ExistenteFim) && novoFim.isAfter(ExistenteInicio);
    }

    public AgendamentoResponseDTO atualizarStatus(Long id, StatusAgendamento novoStatus) {
        Agendamento agendamento = buscarEntidade(id);
        ValidarPermissaoParaAlterarStatus(agendamento, novoStatus);
        agendamento.setStatus(novoStatus);
        Agendamento atualizado = repository.save(agendamento);
        return toDTO(atualizado);
    }

    public List<AgendamentoResponseDTO> listarPorCliente(Long clienteId) {
        return repository.findByClienteId(clienteId).stream().map(this::toDTO).toList();
    }
    public List<AgendamentoResponseDTO> listarPorBarbeiro(Long barbeiroId) {
        return repository.findByBarbeiroId(barbeiroId).stream().map(this::toDTO).toList();
    }
    private Agendamento buscarEntidade(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento não encontrado"));
    }

    public List<AgendamentoResponseDTO> listar(Long clienteIdParam, Long barbeiroIdParam) {

        if (authenticateUser.isAdmin()){
        if(clienteIdParam != null) return listarPorCliente(clienteIdParam);
        if(barbeiroIdParam != null) return listarPorBarbeiro(barbeiroIdParam);
        return listarTodos();
        }

        String email = authenticateUser.getEmail();

        var clienteLogado = clienteRepository.findByEmail(email);
        if (clienteLogado.isPresent()){
            return listarPorCliente(clienteLogado.get().getId());
        }
        var barbeiroLogado = barbeiroRepository.findByEmail(email);
        if (barbeiroLogado.isPresent()){
            return listarPorBarbeiro(barbeiroLogado.get().getId());
        }
        throw new BadRequestException("Usuário não autorizado a visualizar agendamentos.");
    }

    public AgendamentoResponseDTO listarPorId(Long id){ 

        Agendamento agendamento = buscarEntidade(id);
        ValidarAcesso(agendamento);
        return toDTO(agendamento);
    }

    private void ValidarAcesso(Agendamento agendamento) {
        if (authenticateUser.isAdmin()) return;

        String email = authenticateUser.getEmail();
        boolean EhOCliente = agendamento.getCliente().getEmail().equals(email);
        boolean EhOBarbeiro = agendamento.getBarbeiro().getEmail().equals(email);

        if (!EhOCliente && !EhOBarbeiro) {
            throw new BadRequestException("Usuário não autorizado a visualizar este agendamento.");
        }
    }

    private void ValidarPermissaoParaAlterarStatus(Agendamento agendamento, StatusAgendamento novoStatus) {
        if (authenticateUser.isAdmin()) return;

        String email = authenticateUser.getEmail();
        boolean EhOCliente = agendamento.getCliente().getEmail().equals(email);
        boolean EhOBarbeiro = agendamento.getBarbeiro().getEmail().equals(email);

        if (!EhOCliente && !EhOBarbeiro) {
            throw new BadRequestException("Usuário não autorizado a atualizar este agendamento.");
        }

        if (EhOCliente && novoStatus != StatusAgendamento.CANCELADO) {
            throw new BadRequestException("Clientes só podem cancelar agendamentos.");
        }

    }

    private AgendamentoResponseDTO toDTO(Agendamento a) {

        List<ServicoDTO> servicosDTO = a.getServicos().stream()
                .map(s -> new ServicoDTO(s.getId(), s.getNome(),s.getDescricao(),s.getPreco(), s.getDuracao(), s.isDisponivel()))
                .toList();

        BigDecimal precoTotal = servicosDTO.stream()
                .map(ServicoDTO::getPreco)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        AgendamentoResponseDTO response = new AgendamentoResponseDTO();
        response.setId(a.getId());
        response.setClienteNome(a.getCliente().getNome());
        response.setBarbeiroNome(a.getBarbeiro().getNome());
        response.setUnidadeNome(a.getUnidade().getNome());
        response.setDataHora(a.getDataHora());
        response.setObservacoes(a.getObservacoes());
        response.setStatus(a.getStatus());
        response.setServicos(servicosDTO);
        response.setPrecoTotal(precoTotal);

        return response;
    }

}