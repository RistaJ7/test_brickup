package com.br.lucasfncode.construction_phase_manager.application.model.input.obra;

import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.ObraInputEtapaDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.StatusEtapa;

import java.time.LocalDate;
import java.util.UUID;

public record EtapaInputUpdateObraDTO(
        UUID id,
        ObraInputEtapaDTO obra,
        String nome,
        StatusEtapa status,
        String responsavel,
        LocalDate dataInicio,
        LocalDate dataFim
) {
}
