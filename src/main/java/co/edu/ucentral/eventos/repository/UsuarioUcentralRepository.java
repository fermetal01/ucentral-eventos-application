package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.UsuarioUcentral;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the UsuarioUcentral entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioUcentralRepository extends JpaRepository<UsuarioUcentral, Long> {
}
