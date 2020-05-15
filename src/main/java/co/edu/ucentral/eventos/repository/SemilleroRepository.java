package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Semillero;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Semillero entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SemilleroRepository extends JpaRepository<Semillero, Long> {
}
