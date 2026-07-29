package com.Barbearia.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.Barbearia.backend.DTO.ServicoDTO;
import org.springframework.http.HttpStatus;
import com.Barbearia.backend.service.ServicoService;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    private final ServicoService service;

    public ServicoController(ServicoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServicoDTO> listarTodos(@RequestParam(required = false) Boolean disponivel) {
        if (Boolean.TRUE.equals(disponivel)) {
            return service.listarDisponiveis();
        } else {
            return service.listar();
        }
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoDTO criar(@RequestBody ServicoDTO dto) {
        return service.criar(dto);
    }
}
