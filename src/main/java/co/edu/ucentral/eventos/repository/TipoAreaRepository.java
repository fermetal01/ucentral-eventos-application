package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.TipoArea;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoArea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoAreaRepository extends JpaRepository<TipoArea, Long> {
}
