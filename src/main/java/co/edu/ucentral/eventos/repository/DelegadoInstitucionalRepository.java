package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.DelegadoInstitucional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the DelegadoInstitucional entity.
 */
@Repository
public interface DelegadoInstitucionalRepository extends JpaRepository<DelegadoInstitucional, Long> {

    @Query(value = "select distinct delegadoInstitucional from DelegadoInstitucional delegadoInstitucional left join fetch delegadoInstitucional.institucions",
        countQuery = "select count(distinct delegadoInstitucional) from DelegadoInstitucional delegadoInstitucional")
    Page<DelegadoInstitucional> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct delegadoInstitucional from DelegadoInstitucional delegadoInstitucional left join fetch delegadoInstitucional.institucions")
    List<DelegadoInstitucional> findAllWithEagerRelationships();

    @Query("select delegadoInstitucional from DelegadoInstitucional delegadoInstitucional left join fetch delegadoInstitucional.institucions where delegadoInstitucional.id =:id")
    Optional<DelegadoInstitucional> findOneWithEagerRelationships(@Param("id") Long id);
}
