package com.Barbearia.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.Barbearia.backend.DTO.ServicoDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

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
    @PreAuthorize("hasRole('ADMIN')")
    public ServicoDTO criar(@RequestBody ServicoDTO dto) {
        return service.criar(dto);
    }
     @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ServicoDTO atualizar(@PathVariable Long id, @RequestBody ServicoDTO dto) {
        return service.atualizar(id, dto);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
