package com.Barbearia.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.Barbearia.backend.DTO.AvaliacaoDTO;
import com.Barbearia.backend.service.AvaliacaoService;


@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService service;

    public AvaliacaoController(AvaliacaoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AvaliacaoDTO criar(@RequestBody AvaliacaoDTO dto) {
        return service.criar(dto);
    }
    @GetMapping("/agendamento/{agendamentoId}")
    public AvaliacaoDTO buscarPorAgendamentoId(@PathVariable Long agendamentoId) {
        return service.BuscarPorAgendamentoId(agendamentoId);
    }
}