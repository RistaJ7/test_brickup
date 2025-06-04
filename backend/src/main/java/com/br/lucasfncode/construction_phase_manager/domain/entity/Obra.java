package com.br.lucasfncode.construction_phase_manager.domain.entity;

import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Entity(name = "obras")
public class Obra {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NonNull
    private String nome;

    @NonNull
    private String descricao;

    @NonNull
    private LocalDate dataInicio;

    @NonNull
    private LocalDate dataPrevisaoFim;

    @OneToMany(mappedBy = "obra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Etapa> etapas;
}
