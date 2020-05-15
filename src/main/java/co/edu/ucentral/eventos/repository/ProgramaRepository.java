package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Programa;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Programa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramaRepository extends JpaRepository<Programa, Long> {
}
