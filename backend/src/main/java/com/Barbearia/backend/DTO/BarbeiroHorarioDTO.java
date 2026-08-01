package com.Barbearia.backend.DTO;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class BarbeiroHorarioDTO {
    private Long id;
    private Long barbeiroId;
    private Integer diaDaSemana;
    private LocalTime horarioInicio;
    private LocalTime horarioFim;

}
