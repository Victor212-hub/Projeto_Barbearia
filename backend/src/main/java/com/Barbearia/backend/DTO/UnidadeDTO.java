package com.Barbearia.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnidadeDTO {
    private Long id;
    private String nome;
    private String endereco;
    private Double latitude;
    private Double longitude;
    private String descrição;

}
