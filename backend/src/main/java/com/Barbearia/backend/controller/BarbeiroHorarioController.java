package com.Barbearia.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.Barbearia.backend.DTO.BarbeiroHorarioDTO;
import com.Barbearia.backend.service.BarbeiroHorarioService;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/barbeiro-horarios")
public class BarbeiroHorarioController {

    private final BarbeiroHorarioService service;

    public BarbeiroHorarioController(BarbeiroHorarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<BarbeiroHorarioDTO> listarPorBarbeiro(@RequestParam Long barbeiroId) {
        return service.ListarPorBarbeiro(barbeiroId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BarbeiroHorarioDTO criar(@RequestBody BarbeiroHorarioDTO dto) {
        return service.criar(dto);
    }
}
