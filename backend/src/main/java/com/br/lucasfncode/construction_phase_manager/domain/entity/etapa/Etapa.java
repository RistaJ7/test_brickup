package com.br.lucasfncode.construction_phase_manager.domain.entity.etapa;

import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Entity(name = "etapas")
public class Etapa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "obra_id")
    private Obra obra;

    @NonNull
    private String nome;

    @NonNull
    @Enumerated(EnumType.STRING)
    private StatusEtapa status;

    @NonNull
    private String responsavel;

    @NonNull
    private LocalDate dataInicio;

    @NonNull
    private LocalDate dataFim;
}
