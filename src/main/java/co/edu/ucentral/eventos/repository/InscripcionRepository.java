package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Inscripcion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Inscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
}
