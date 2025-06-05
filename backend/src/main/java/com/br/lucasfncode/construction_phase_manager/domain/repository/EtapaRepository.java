package com.br.lucasfncode.construction_phase_manager.domain.repository;

import com.br.lucasfncode.construction_phase_manager.domain.entity.Obra;
import com.br.lucasfncode.construction_phase_manager.domain.entity.etapa.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EtapaRepository extends JpaRepository<Etapa, UUID> {
    List<Etapa> findByObra(Obra obra);
}
