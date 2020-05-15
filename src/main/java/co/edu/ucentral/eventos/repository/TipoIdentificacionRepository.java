package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.TipoIdentificacion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoIdentificacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoIdentificacionRepository extends JpaRepository<TipoIdentificacion, Long> {
}
