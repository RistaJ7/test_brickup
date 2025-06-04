package com.br.lucasfncode.construction_phase_manager.domain.repository;

import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EtapaRepository extends JpaRepository<Etapa, UUID> {
}
