package com.Barbearia.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "avaliacao")
@Getter
@Setter
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(  name = "Agendamento_id", nullable = false, unique = true)
    private Agendamento agendamento;

    @Column(name = "nota", nullable = false)
    private Integer nota;

    @Column(name = "comentario", columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "criacao", nullable = false)
    private LocalDateTime criacao = LocalDateTime.now();
}
