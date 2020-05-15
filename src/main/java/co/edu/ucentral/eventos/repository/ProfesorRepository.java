package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Profesor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Profesor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
}
