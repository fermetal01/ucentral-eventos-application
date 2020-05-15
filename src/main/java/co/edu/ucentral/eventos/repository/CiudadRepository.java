package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Ciudad;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ciudad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {
}
