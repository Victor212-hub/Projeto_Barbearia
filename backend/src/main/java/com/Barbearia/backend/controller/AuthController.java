package com.Barbearia.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.Barbearia.backend.DTO.LoginRequestDTO;
import com.Barbearia.backend.DTO.LoginResponseDTO;
import com.Barbearia.backend.service.AuthService;

@RestController 
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login/cliente")
    public LoginResponseDTO loginCliente(@RequestBody LoginRequestDTO dto) {
        return service.loginCliente(dto);
    }
}
