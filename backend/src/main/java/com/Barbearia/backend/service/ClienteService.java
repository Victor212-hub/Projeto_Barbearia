package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import com.Barbearia.backend.DTO.ClienteDTO;
import com.Barbearia.backend.model.Cliente;
import com.Barbearia.backend.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository repository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<ClienteDTO> ListarTodos() {
        return repository.findAll().stream().map(this::toDTO).toList(); 
    }
    public ClienteDTO criar(ClienteDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        cliente.setTelefone(dto.getTelefone());
        Cliente salvo = repository.save(cliente);
        return toDTO(salvo);
    }
    private ClienteDTO toDTO(Cliente c) {
        return new ClienteDTO(c.getId(), c.getNome(), c.getEmail(), null, c.getTelefone());
    }
}
    