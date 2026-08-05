package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.LoginRequestDTO;
import com.Barbearia.backend.DTO.LoginResponseDTO;
import com.Barbearia.backend.model.Cliente;
import com.Barbearia.backend.repository.ClienteRepository;
import com.Barbearia.backend.security.JwtUtil;

@Service
public class AuthService {
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDTO loginCliente(LoginRequestDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new RuntimeException("Email ou Senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), cliente.getSenha())) {
            throw new RuntimeException("Email ou Senha inválidos");
        }
        String token = jwtUtil.generateToken(cliente.getEmail(), cliente.getId());

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setId(cliente.getId());
        response.setNome(cliente.getNome());
        response.setEmail(cliente.getEmail());
        return response;
    }
}