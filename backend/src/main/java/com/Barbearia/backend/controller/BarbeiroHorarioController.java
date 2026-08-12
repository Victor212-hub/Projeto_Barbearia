package com.Barbearia.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.Barbearia.backend.DTO.BarbeiroHorarioDTO;
import com.Barbearia.backend.service.BarbeiroHorarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

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
    @PreAuthorize("hasAnyRole('ADMIN', 'BARBEIRO')")
    public BarbeiroHorarioDTO criar(@RequestBody BarbeiroHorarioDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'BARBEIRO')")
    public BarbeiroHorarioDTO atualizar(@PathVariable Long id, @RequestBody BarbeiroHorarioDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'BARBEIRO')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
