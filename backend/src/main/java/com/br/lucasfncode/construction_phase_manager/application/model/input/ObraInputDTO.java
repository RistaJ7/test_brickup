package com.br.lucasfncode.construction_phase_manager.application.model.input;

import java.time.LocalDate;

public record ObraInputDTO(
        String nome,
        String descricao,
        LocalDate dataInicio,
        LocalDate dataPrevisaoFim
) {
}
