package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.AreaConocimiento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AreaConocimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AreaConocimientoRepository extends JpaRepository<AreaConocimiento, Long> {
}
