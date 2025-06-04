package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.EtapaInputDTO;
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
    private final ObraService obraService;

    public Etapa criarEtapa(EtapaInputDTO etapaInputDTO) {
        return etapaRepository.save(convertEtapaInputDTOToEtapa(etapaInputDTO));
    }

    public Etapa atualizarEtapa(UUID id, EtapaInputDTO etapaInputDTO) {
        Etapa etapa = convertEtapaInputDTOToEtapa(etapaInputDTO);
        etapa.setId(id);
        return etapaRepository.save(etapa);
    }

    public Etapa buscarEtapaPorId(UUID id) {
        return etapaRepository.findById(id).orElseThrow();
    }

    public List<Etapa> buscarTodasEtapas() {
        return etapaRepository.findAll();
    }

    public void excluirEtapa(UUID idEtapa) {
        etapaRepository.deleteById(idEtapa);
    }

    private Etapa convertEtapaInputDTOToEtapa(EtapaInputDTO etapaInputDTO) {
        Obra obra = obraService.buscarObraPorId(etapaInputDTO.obra().id());

        return new Etapa(
                obra,
                etapaInputDTO.nome(),
                etapaInputDTO.status(),
                etapaInputDTO.responsavel(),
                etapaInputDTO.dataInicio(),
                etapaInputDTO.dataFim()
        );
    }

}
