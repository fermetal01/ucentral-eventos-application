package co.edu.ucentral.eventos.repository;

import co.edu.ucentral.eventos.domain.Estudiante;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Estudiante entity.
 */
@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    @Query(value = "select distinct estudiante from Estudiante estudiante left join fetch estudiante.proyectos",
        countQuery = "select count(distinct estudiante) from Estudiante estudiante")
    Page<Estudiante> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct estudiante from Estudiante estudiante left join fetch estudiante.proyectos")
    List<Estudiante> findAllWithEagerRelationships();

    @Query("select estudiante from Estudiante estudiante left join fetch estudiante.proyectos where estudiante.id =:id")
    Optional<Estudiante> findOneWithEagerRelationships(@Param("id") Long id);
}
