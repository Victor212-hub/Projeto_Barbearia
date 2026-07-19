package com.Barbearia.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.Barbearia.backend.DTO.ClienteDTO;
import com.Barbearia.backend.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }
    @GetMapping
    public List<ClienteDTO> listarTodos() {
        return service.ListarTodos();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteDTO criar(@RequestBody ClienteDTO dto) {
        return service.criar(dto);  
    }
}
