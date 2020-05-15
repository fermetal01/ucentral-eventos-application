package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.ProyectoCategoria;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProyectoCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProyectoCategoriaRepository extends JpaRepository<ProyectoCategoria, Long> {
}
