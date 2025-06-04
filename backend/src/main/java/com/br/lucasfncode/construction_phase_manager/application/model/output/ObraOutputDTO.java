package com.br.lucasfncode.construction_phase_manager.application.model.output;

import java.time.LocalDate;
import java.util.UUID;

public record ObraOutputDTO(
        UUID id,
        String nome,
        String descricao,
        LocalDate dataInicio,
        LocalDate dataPrevisaoFim
) {
}
