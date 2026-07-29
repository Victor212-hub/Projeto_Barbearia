package com.Barbearia.backend.DTO;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoRequestDTO {
    private Long clienteId;
    private Long barbeiroId;
    private Long unidadeId;
    private LocalDateTime dataHora;
    private String observacoes;
    private List<Long> servicosIds;
}
