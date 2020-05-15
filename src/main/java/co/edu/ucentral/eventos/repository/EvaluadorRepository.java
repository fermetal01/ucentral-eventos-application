package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Evaluador;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Evaluador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluadorRepository extends JpaRepository<Evaluador, Long> {
}
