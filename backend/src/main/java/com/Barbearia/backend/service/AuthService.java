package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Barbearia.backend.DTO.LoginRequestDTO;
import com.Barbearia.backend.DTO.LoginResponseDTO;
import com.Barbearia.backend.exception.BadRequestException;
import com.Barbearia.backend.model.Barbeiro;
import com.Barbearia.backend.model.Cliente;
import com.Barbearia.backend.repository.BarbeiroRepository;
import com.Barbearia.backend.repository.ClienteRepository;
import com.Barbearia.backend.security.JwtUtil;

@Service
public class AuthService {
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public AuthService(ClienteRepository clienteRepository,BarbeiroRepository barbeiroRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDTO loginCliente(LoginRequestDTO dto) {
        Cliente cliente = clienteRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new BadRequestException("Email ou Senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), cliente.getSenha())) {
            throw new BadRequestException("Email ou Senha inválidos");
        }
        String token = jwtUtil.generateToken(cliente.getEmail(), cliente.getId(), "CLIENTE");

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setId(cliente.getId());
        response.setNome(cliente.getNome());
        response.setEmail(cliente.getEmail());
        return response;
    }

    public LoginResponseDTO loginBarbeiro(LoginRequestDTO dto) {
        Barbeiro barbeiro = barbeiroRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new BadRequestException("Email ou Senha inválidos"));

        if (!passwordEncoder.matches(dto.getSenha(), barbeiro.getSenha())) {
            throw new BadRequestException("Email ou Senha inválidos");
        }
        String token = jwtUtil.generateToken(barbeiro.getEmail(), barbeiro.getId(), "BARBEIRO");

        LoginResponseDTO response = new LoginResponseDTO();
        response.setToken(token);
        response.setId(barbeiro.getId());
        response.setNome(barbeiro.getNome());
        response.setEmail(barbeiro.getEmail());
        return response;
    }
}