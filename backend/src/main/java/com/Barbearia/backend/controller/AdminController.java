package com.Barbearia.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.Barbearia.backend.DTO.AdminDTO;
import com.Barbearia.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public AdminDTO criar(@RequestBody AdminDTO dto) {
        return service.criar(dto);
    }
}
