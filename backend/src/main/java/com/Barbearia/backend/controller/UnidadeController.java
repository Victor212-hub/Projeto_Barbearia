package com.Barbearia.backend.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.Barbearia.backend.DTO.UnidadeDTO;
import com.Barbearia.backend.service.UnidadeService;

@RestController
@RequestMapping("/api/unidades")

public class UnidadeController {
    private final UnidadeService Service;

    public UnidadeController(UnidadeService Service) {
        this.Service = Service;
    }
    @GetMapping
    public List<UnidadeDTO> listar() {
        return Service.listar();
}
   @PostMapping
@ResponseStatus(HttpStatus.CREATED)
@PreAuthorize("hasRole('ADMIN')")
public UnidadeDTO criar(@RequestBody UnidadeDTO dto) {
    return Service.criar(dto);
}
 @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UnidadeDTO atualizar(@PathVariable Long id, @RequestBody UnidadeDTO dto) {
        return Service.atualizar(id, dto);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}