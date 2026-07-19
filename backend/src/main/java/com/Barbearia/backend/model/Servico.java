package com.Barbearia.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "servicos")
@Getter
@Setter
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false,precision = 10, scale = 2)
    private BigDecimal preco;

    private Integer duracao;

    @Column(nullable = false)
    private boolean disponivel = true;
}
