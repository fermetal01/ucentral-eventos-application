package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Estadistica;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Estadistica entity.
 */
@Repository
public interface EstadisticaRepository extends JpaRepository<Estadistica, Long> {

    @Query(value = "select distinct estadistica from Estadistica estadistica left join fetch estadistica.eventos",
        countQuery = "select count(distinct estadistica) from Estadistica estadistica")
    Page<Estadistica> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct estadistica from Estadistica estadistica left join fetch estadistica.eventos")
    List<Estadistica> findAllWithEagerRelationships();

    @Query("select estadistica from Estadistica estadistica left join fetch estadistica.eventos where estadistica.id =:id")
    Optional<Estadistica> findOneWithEagerRelationships(@Param("id") Long id);
}
