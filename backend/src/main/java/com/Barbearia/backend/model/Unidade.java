package com.Barbearia.backend.model;
import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

@Entity
@Table(name = "unidades")
@Getter
@Setter
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String Endereço;
    private Double latitude;
    private Double longitude;
    private String Descrição;

}
