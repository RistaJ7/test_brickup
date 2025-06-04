package com.br.lucasfncode.construction_phase_manager.application.model.input.etapa;

import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.StatusEtapa;

import java.time.LocalDate;

public record EtapaInputDTO(
        ObraInputEtapaDTO obra,
        String nome,
        StatusEtapa status,
        String responsavel,
        LocalDate dataInicio,
        LocalDate dataFim
) {
}
