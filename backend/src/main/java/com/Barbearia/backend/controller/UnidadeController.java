package com.Barbearia.backend.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
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
public UnidadeDTO criar(@RequestBody UnidadeDTO dto) {
    return Service.criar(dto);
}
}