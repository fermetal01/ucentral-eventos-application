package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Estadistica;
import co.edu.ucentral.eventos.repository.EstadisticaRepository;
import co.edu.ucentral.eventos.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Estadistica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EstadisticaResource {

    private final Logger log = LoggerFactory.getLogger(EstadisticaResource.class);

    private static final String ENTITY_NAME = "estadistica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadisticaRepository estadisticaRepository;

    public EstadisticaResource(EstadisticaRepository estadisticaRepository) {
        this.estadisticaRepository = estadisticaRepository;
    }

    /**
     * {@code POST  /estadisticas} : Create a new estadistica.
     *
     * @param estadistica the estadistica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadistica, or with status {@code 400 (Bad Request)} if the estadistica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estadisticas")
    public ResponseEntity<Estadistica> createEstadistica(@RequestBody Estadistica estadistica) throws URISyntaxException {
        log.debug("REST request to save Estadistica : {}", estadistica);
        if (estadistica.getId() != null) {
            throw new BadRequestAlertException("A new estadistica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estadistica result = estadisticaRepository.save(estadistica);
        return ResponseEntity.created(new URI("/api/estadisticas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estadisticas} : Updates an existing estadistica.
     *
     * @param estadistica the estadistica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadistica,
     * or with status {@code 400 (Bad Request)} if the estadistica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadistica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estadisticas")
    public ResponseEntity<Estadistica> updateEstadistica(@RequestBody Estadistica estadistica) throws URISyntaxException {
        log.debug("REST request to update Estadistica : {}", estadistica);
        if (estadistica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Estadistica result = estadisticaRepository.save(estadistica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estadistica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estadisticas} : get all the estadisticas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadisticas in body.
     */
    @GetMapping("/estadisticas")
    public List<Estadistica> getAllEstadisticas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Estadisticas");
        return estadisticaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /estadisticas/:id} : get the "id" estadistica.
     *
     * @param id the id of the estadistica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadistica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estadisticas/{id}")
    public ResponseEntity<Estadistica> getEstadistica(@PathVariable Long id) {
        log.debug("REST request to get Estadistica : {}", id);
        Optional<Estadistica> estadistica = estadisticaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(estadistica);
    }

    /**
     * {@code DELETE  /estadisticas/:id} : delete the "id" estadistica.
     *
     * @param id the id of the estadistica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estadisticas/{id}")
    public ResponseEntity<Void> deleteEstadistica(@PathVariable Long id) {
        log.debug("REST request to delete Estadistica : {}", id);
        estadisticaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
