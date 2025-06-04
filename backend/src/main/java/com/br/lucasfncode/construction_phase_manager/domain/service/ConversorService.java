package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.ObraInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.EtapaInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.EtapaOutputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.ObraOutputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import org.springframework.stereotype.Service;

@Service
public class ConversorService {

    public Obra obraInputDTOParaObra(ObraInputDTO obraInputDTO) {
        return new Obra(
                obraInputDTO.nome(),
                obraInputDTO.descricao(),
                obraInputDTO.dataInicio(),
                obraInputDTO.dataPrevisaoFim()
        );
    }

    public ObraOutputDTO obraParaObraOutputDTO(Obra obra) {
        return new ObraOutputDTO(
                obra.getId(),
                obra.getNome(),
                obra.getDescricao(),
                obra.getDataInicio(),
                obra.getDataPrevisaoFim()
        );
    }

    public Etapa etapaInputDTOParaEtapa(EtapaInputDTO etapaInputDTO, Obra obra) {
        return new Etapa(
                obra,
                etapaInputDTO.nome(),
                etapaInputDTO.status(),
                etapaInputDTO.responsavel(),
                etapaInputDTO.dataInicio(),
                etapaInputDTO.dataFim()
        );
    }

    public EtapaOutputDTO etapaParaEtapaOutpuDTO(Etapa etapa, Obra obra) {
        return new EtapaOutputDTO(
                etapa.getId(),
                this.obraParaObraOutputDTO(obra),
                etapa.getNome(),
                etapa.getStatus(),
                etapa.getResponsavel(),
                etapa.getDataInicio(),
                etapa.getDataFim()
        );
    }
}
