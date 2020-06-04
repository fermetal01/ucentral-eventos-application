package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Semillero;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Semillero entity.
 */
@Repository
public interface SemilleroRepository extends JpaRepository<Semillero, Long> {

    @Query(value = "select distinct semillero from Semillero semillero left join fetch semillero.profesors",
        countQuery = "select count(distinct semillero) from Semillero semillero")
    Page<Semillero> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct semillero from Semillero semillero left join fetch semillero.profesors")
    List<Semillero> findAllWithEagerRelationships();

    @Query("select semillero from Semillero semillero left join fetch semillero.profesors where semillero.id =:id")
    Optional<Semillero> findOneWithEagerRelationships(@Param("id") Long id);
}
