package com.Barbearia.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Barbearia.backend.DTO.AdminDTO;
import com.Barbearia.backend.exception.BadRequestException;
import com.Barbearia.backend.model.Admin;
import com.Barbearia.backend.repository.AdminRepository;

@Service
public class AdminService {
    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository repository, PasswordEncoder passwordEncoder){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }
public AdminDTO criar(AdminDTO dto){
    if(repository.findByEmail(dto.getEmail()).isPresent()){
        throw new BadRequestException("Email já cadastrado");
    }
    Admin admin = new Admin();
    admin.setNome(dto.getNome());
    admin.setEmail(dto.getEmail());
    admin.setSenha(passwordEncoder.encode(dto.getSenha()));
    Admin salvo = repository.save(admin);
    return ToDTO(salvo);
}

    private AdminDTO ToDTO(Admin a){
        AdminDTO dto = new AdminDTO();
        dto.setId(a.getId());
        dto.setNome(a.getNome());
        dto.setEmail(a.getEmail());
        return dto;
    }

}
