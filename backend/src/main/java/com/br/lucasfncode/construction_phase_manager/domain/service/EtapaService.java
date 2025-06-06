package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.EtapaInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.EtapaOutputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import com.br.lucasfncode.construction_phase_manager.domain.repository.EtapaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EtapaService {

    private final EtapaRepository etapaRepository;
    private final ConversorService conversorService;
    private final ObraService obraService;

    public EtapaOutputDTO criarEtapa(EtapaInputDTO etapaInputDTO) {
        Obra obra = obraService.buscarObraEntityPorId(etapaInputDTO.obra().id());
        Etapa etapa = conversorService.etapaInputDTOParaEtapa(etapaInputDTO, obra);
        return conversorService.etapaParaEtapaOutpuDTO(etapaRepository.save(etapa), obra);
    }

    public EtapaOutputDTO atualizarEtapa(UUID id, EtapaInputDTO etapaInputDTO) {
        Obra obra = obraService.buscarObraEntityPorId(etapaInputDTO.obra().id());
        Etapa etapa = conversorService.etapaInputDTOParaEtapa(etapaInputDTO, obra);
        etapa.setId(id);
        return conversorService.etapaParaEtapaOutpuDTO(etapaRepository.save(etapa), obra);
    }

    public EtapaOutputDTO buscarEtapaPorId(UUID id) {
        Etapa etapa = etapaRepository.findById(id).orElseThrow();
        return conversorService.etapaParaEtapaOutpuDTO(etapa, etapa.getObra());
    }

    public List<EtapaOutputDTO> buscarTodasEtapas() {
        return etapaRepository.findAll().stream().map(etapa -> this.conversorService
                .etapaParaEtapaOutpuDTO(etapa, etapa.getObra())).toList();
    }

    public void excluirEtapa(UUID idEtapa) {
        etapaRepository.deleteById(idEtapa);
    }


}
