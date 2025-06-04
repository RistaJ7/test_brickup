package com.br.lucasfncode.construction_phase_manager.domain.service;

import com.br.lucasfncode.construction_phase_manager.application.model.input.ObraInputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.repository.ObraRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ObraService {

    private final ObraRepository obraRepository;

    public Obra criarObra(ObraInputDTO obraInputDTO) {
        return obraRepository.save(conversorObraInputDTOParaObra(obraInputDTO));
    }

    public Obra atualizarObra(UUID id, ObraInputDTO obraInputDTO) {
        Obra obra = conversorObraInputDTOParaObra(obraInputDTO);
        obra.setId(id);
        return obraRepository.save(obra);
    }

    public Obra buscarObraPorId(UUID id) {
        return obraRepository.findById(id).orElseThrow();
    }

    public List<Obra> buscarTodasObras() {
        return obraRepository.findAll();
    }

    public void excluirObra(UUID id) {
        obraRepository.deleteById(id);
    }

    private Obra conversorObraInputDTOParaObra(ObraInputDTO obraInputDTO) {
        return new Obra(
                obraInputDTO.nome(),
                obraInputDTO.descricao(),
                obraInputDTO.dataInicio(),
                obraInputDTO.dataPrevisaoFim()
        );
    }
}
