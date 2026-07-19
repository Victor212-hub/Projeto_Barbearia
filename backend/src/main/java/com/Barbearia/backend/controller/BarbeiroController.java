package com.Barbearia.backend.controller;

import com.Barbearia.backend.service.BarbeiroService;
import com.Barbearia.backend.DTO.BarbeiroDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/barbeiros")
public class BarbeiroController {

    private final BarbeiroService service;

    public BarbeiroController(BarbeiroService service) {
        this.service = service;
    }

    @GetMapping
    public List<BarbeiroDTO> listar(@RequestParam(required = false) Long unidadeId) {
        if (unidadeId != null) {
            return service.listarPorUnidade(unidadeId);
        }
        return service.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BarbeiroDTO criar(@RequestBody BarbeiroDTO dto) {
        return service.criar(dto);
    }
}