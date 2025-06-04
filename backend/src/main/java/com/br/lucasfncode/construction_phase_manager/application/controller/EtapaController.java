package com.br.lucasfncode.construction_phase_manager.application.controller;

import com.br.lucasfncode.construction_phase_manager.application.model.input.etapa.EtapaInputDTO;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import com.br.lucasfncode.construction_phase_manager.domain.service.EtapaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/etapas")
@AllArgsConstructor
public class EtapaController {

    private final EtapaService etapaService;

    @PostMapping
    public ResponseEntity<Etapa> criar(@RequestBody EtapaInputDTO etapa) {
        return ResponseEntity.status(HttpStatus.CREATED).body(etapaService.criarEtapa(etapa));
    }

    @PutMapping("/{idEtapa}")
    public ResponseEntity<Etapa> atulizar(@PathVariable UUID idEtapa, @RequestBody EtapaInputDTO etapa) {
        return ResponseEntity.status(HttpStatus.OK).body(etapaService.atualizarEtapa(idEtapa, etapa));
    }

    @GetMapping("/{idEtapa}")
    public ResponseEntity<Etapa> buscarEtapa(@PathVariable UUID idEtapa) {
        return ResponseEntity.status(HttpStatus.OK).body(etapaService.buscarEtapaPorId(idEtapa));
    }

    @GetMapping
    public ResponseEntity<List<Etapa>> listarEtapas() {
        return ResponseEntity.ok(etapaService.buscarTodasEtapas());
    }

    @DeleteMapping("/{idEtapa}")
    public ResponseEntity<Void> excluir(@PathVariable UUID idEtapa) {
        etapaService.excluirEtapa(idEtapa);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
