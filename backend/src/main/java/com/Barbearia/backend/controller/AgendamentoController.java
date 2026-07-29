package com.Barbearia.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.Barbearia.backend.DTO.AgendamentoRequestDTO;
import com.Barbearia.backend.DTO.AgendamentoResponseDTO;
import com.Barbearia.backend.model.StatusAgendamento;
import com.Barbearia.backend.service.AgendamentoService;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {
     
    private final AgendamentoService Service;

    public AgendamentoController(AgendamentoService Service) {
        this.Service = Service;
    }

    @GetMapping
    public List<AgendamentoResponseDTO> listar() {
        return Service.listarTodos();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AgendamentoResponseDTO criar(@RequestBody AgendamentoRequestDTO dto) {
        return Service.criar(dto);
    }
    @PatchMapping("/{id}/status")
public AgendamentoResponseDTO atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
    StatusAgendamento status = StatusAgendamento.valueOf(body.get("status").toUpperCase());
    return Service.atualizarStatus(id, status);
}
}