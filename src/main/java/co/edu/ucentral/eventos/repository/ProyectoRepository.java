package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Proyecto;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Proyecto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}
