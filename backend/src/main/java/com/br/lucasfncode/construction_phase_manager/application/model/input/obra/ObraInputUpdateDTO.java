package com.br.lucasfncode.construction_phase_manager.application.model.input.obra;

import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.EtapaInputDTO;

import java.time.LocalDate;
import java.util.List;

public record ObraInputUpdateDTO(
        String nome,
        String descricao,
        LocalDate dataInicio,
        LocalDate dataPrevisaoFim,
        List<EtapaInputUpdateObraDTO> etapas
) {
}
