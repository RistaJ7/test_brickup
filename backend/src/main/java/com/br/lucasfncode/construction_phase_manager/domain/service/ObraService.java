package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.obra.ObraInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.input.obra.ObraInputUpdateDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.EtapaOutputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.ObraOutputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.StatusEtapa;
import com.br.lucasfncode.construction_phase_manager.domain.repository.ObraRepository;
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

    public ObraOutputDTO atualizarObra(UUID id, ObraInputUpdateDTO obraInputDTO) {
        Obra obra = conversorService.obraInputUpdateDTOParaObra(obraInputDTO);
        obra.setId(id);
        List<Etapa> etapas = obraInputDTO.etapas().stream().map(etapa ->
                conversorService.etapaInputUpdateObraDTOParaEtapa(etapa, obra)).toList();
        obra.setEtapas(etapas);
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

    public List<EtapaOutputDTO> buscarEtapasDeUmaObra(UUID id) {
        return this.buscarObraEntityPorId(id).getEtapas().stream().map(etapa -> this.conversorService
                .etapaParaEtapaOutpuDTO(etapa, this.buscarObraEntityPorId(id))).toList();
    }

    public Long buscarEtapasConcluidasObra(UUID id) {
        Integer totalEtapas = this.buscarEtapasDeUmaObra(id).size();
        if (totalEtapas.equals(0)) return totalEtapas.longValue();
        Long etapasConcluidas = this.buscarObraEntityPorId(id).getEtapas().stream()
                .filter(etapa -> etapa.getStatus()
                        .equals(StatusEtapa.CONCLUIDA)).count();

        return (etapasConcluidas * 100) / totalEtapas;
    }

    public void excluirObra(UUID id) {
        obraRepository.deleteById(id);
    }


}
