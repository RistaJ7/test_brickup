package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.ObraInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.ObraOutputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.StatusEtapa;
import com.br.lucasfncode.construction_phase_manager.domain.repository.ObraRepository;
import com.sun.jdi.LongValue;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ObraService {

    private final ObraRepository obraRepository;
    private final ConversorService conversorService;

    public ObraOutputDTO criarObra(ObraInputDTO obraInputDTO) {
        Obra obra = conversorService.obraInputDTOParaObra(obraInputDTO);
        return conversorService.obraParaObraOutputDTO(obraRepository.save(obra));
    }

    public ObraOutputDTO atualizarObra(UUID id, ObraInputDTO obraInputDTO) {
        Obra obra = conversorService.obraInputDTOParaObra(obraInputDTO);
        obra.setId(id);
        return conversorService.obraParaObraOutputDTO(obraRepository.save(obra));
    }

    public ObraOutputDTO buscarObraPorId(UUID id) {
        return conversorService.obraParaObraOutputDTO(obraRepository.findById(id).orElseThrow());
    }

    protected Obra buscarObraEntityPorId(UUID id) {
        return obraRepository.findById(id).orElseThrow();
    }

    public List<ObraOutputDTO> buscarTodasObras() {
        return obraRepository.findAll().stream().map(conversorService::obraParaObraOutputDTO).toList();
    }

    public Long buscarEtapasConcluidasObra(UUID id) {
        return this.buscarObraEntityPorId(id).getEtapas().stream().filter(etapa -> etapa.getStatus()
                .equals(StatusEtapa.CONCLUIDA)).count();
    }

    public void excluirObra(UUID id) {
        obraRepository.deleteById(id);
    }


}
