package com.Barbearia.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BarbeiroDTO {
    private Long id;
    private Long unidadeId;
    private String nome;
    private String email;
    private String senha;
    private Boolean disponivel;
}
