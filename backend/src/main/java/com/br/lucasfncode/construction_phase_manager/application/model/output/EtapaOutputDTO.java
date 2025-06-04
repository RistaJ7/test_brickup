package com.br.lucasfncode.construction_phase_manager.application.model.output;

import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.StatusEtapa;

import java.time.LocalDate;
import java.util.UUID;

public record EtapaOutputDTO(
        UUID id,
        ObraOutputDTO obra,
        String nome,
        StatusEtapa status,
        String responsavel,
        LocalDate dataInicio,
        LocalDate dataFim
) {
}
