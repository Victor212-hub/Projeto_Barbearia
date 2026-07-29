package com.Barbearia.backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import com.Barbearia.backend.model.StatusAgendamento;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoResponseDTO {

    private Long id;
    private String ClienteNome;
    private String BarbeiroNome;
    private String UnidadeNome;
    private LocalDateTime dataHora;
    private StatusAgendamento status;
    private String observacoes;
    private BigDecimal precoTotal;
    private List<ServicoDTO> servicos;
}
