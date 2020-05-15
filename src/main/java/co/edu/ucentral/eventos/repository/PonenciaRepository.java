package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Ponencia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Ponencia entity.
 */
@Repository
public interface PonenciaRepository extends JpaRepository<Ponencia, Long> {

    @Query(value = "select distinct ponencia from Ponencia ponencia left join fetch ponencia.evaluadors",
        countQuery = "select count(distinct ponencia) from Ponencia ponencia")
    Page<Ponencia> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct ponencia from Ponencia ponencia left join fetch ponencia.evaluadors")
    List<Ponencia> findAllWithEagerRelationships();

    @Query("select ponencia from Ponencia ponencia left join fetch ponencia.evaluadors where ponencia.id =:id")
    Optional<Ponencia> findOneWithEagerRelationships(@Param("id") Long id);
}
