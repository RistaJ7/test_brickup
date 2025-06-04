package com.br.lucasfncode.construction_phase_manager.application.controller;

import com.br.lucasfncode.construction_phase_manager.application.model.input.ObraInputDTO;
import com.br.lucasfncode.construction_phase_manager.application.model.output.ObraOutputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.service.ObraService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/obras")
@AllArgsConstructor
public class ObraController {

    private final ObraService obraService;

    @PostMapping
    public ResponseEntity<ObraOutputDTO> criar(@RequestBody ObraInputDTO obraInputDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(obraService.criarObra(obraInputDTO));
    }

    @PutMapping("/{idObra}")
    public ResponseEntity<ObraOutputDTO> atualizar(@PathVariable UUID idObra, @RequestBody ObraInputDTO obraInputDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(obraService.atualizarObra(idObra, obraInputDTO));
    }

    @GetMapping("/{idObra}")
    public ResponseEntity<ObraOutputDTO> buscar(@PathVariable UUID idObra) {
        return ResponseEntity.status(HttpStatus.OK).body(obraService.buscarObraPorId(idObra));
    }

    @GetMapping
    public ResponseEntity<List<ObraOutputDTO>> listarObras() {
        return ResponseEntity.ok(obraService.buscarTodasObras());
    }

    @DeleteMapping("/{idObra}")
    public ResponseEntity<ObraOutputDTO> excluir(@PathVariable UUID idObra) {
        obraService.excluirObra(idObra);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
