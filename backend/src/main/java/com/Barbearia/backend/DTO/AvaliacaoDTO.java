package com.Barbearia.backend.DTO;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvaliacaoDTO {

    private Long id;
    private Long agendamentoId;
    private Integer nota;
    private String comentario;
    private LocalDateTime criacao;

}
