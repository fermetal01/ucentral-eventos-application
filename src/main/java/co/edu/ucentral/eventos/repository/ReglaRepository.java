package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Regla;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Regla entity.
 */
@Repository
public interface ReglaRepository extends JpaRepository<Regla, Long> {

    @Query(value = "select distinct regla from Regla regla left join fetch regla.eventos",
        countQuery = "select count(distinct regla) from Regla regla")
    Page<Regla> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct regla from Regla regla left join fetch regla.eventos")
    List<Regla> findAllWithEagerRelationships();

    @Query("select regla from Regla regla left join fetch regla.eventos where regla.id =:id")
    Optional<Regla> findOneWithEagerRelationships(@Param("id") Long id);
}
