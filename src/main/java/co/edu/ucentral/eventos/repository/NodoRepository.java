package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Nodo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Nodo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NodoRepository extends JpaRepository<Nodo, Long> {
}
