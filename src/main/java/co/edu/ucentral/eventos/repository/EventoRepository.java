package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Evento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Evento entity.
 */
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query(value = "select distinct evento from Evento evento left join fetch evento.areaConocimientos left join fetch evento.areas left join fetch evento.reglas",
        countQuery = "select count(distinct evento) from Evento evento")
    Page<Evento> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct evento from Evento evento left join fetch evento.areaConocimientos left join fetch evento.areas left join fetch evento.reglas")
    List<Evento> findAllWithEagerRelationships();

    @Query("select evento from Evento evento left join fetch evento.areaConocimientos left join fetch evento.areas left join fetch evento.reglas where evento.id =:id")
    Optional<Evento> findOneWithEagerRelationships(@Param("id") Long id);
}
