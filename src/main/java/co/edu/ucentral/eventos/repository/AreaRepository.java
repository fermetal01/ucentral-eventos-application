package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Area;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Area entity.
 */
@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {

    @Query(value = "select distinct area from Area area left join fetch area.eventos",
        countQuery = "select count(distinct area) from Area area")
    Page<Area> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct area from Area area left join fetch area.eventos")
    List<Area> findAllWithEagerRelationships();

    @Query("select area from Area area left join fetch area.eventos where area.id =:id")
    Optional<Area> findOneWithEagerRelationships(@Param("id") Long id);
}
