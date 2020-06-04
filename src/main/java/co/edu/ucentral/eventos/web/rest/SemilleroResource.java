package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Semillero;
import co.edu.ucentral.eventos.repository.SemilleroRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Semillero}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SemilleroResource {

    private final Logger log = LoggerFactory.getLogger(SemilleroResource.class);

    private static final String ENTITY_NAME = "semillero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SemilleroRepository semilleroRepository;

    public SemilleroResource(SemilleroRepository semilleroRepository) {
        this.semilleroRepository = semilleroRepository;
    }

    /**
     * {@code POST  /semilleros} : Create a new semillero.
     *
     * @param semillero the semillero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new semillero, or with status {@code 400 (Bad Request)} if the semillero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/semilleros")
    public ResponseEntity<Semillero> createSemillero(@RequestBody Semillero semillero) throws URISyntaxException {
        log.debug("REST request to save Semillero : {}", semillero);
        if (semillero.getId() != null) {
            throw new BadRequestAlertException("A new semillero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Semillero result = semilleroRepository.save(semillero);
        return ResponseEntity.created(new URI("/api/semilleros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /semilleros} : Updates an existing semillero.
     *
     * @param semillero the semillero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated semillero,
     * or with status {@code 400 (Bad Request)} if the semillero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the semillero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/semilleros")
    public ResponseEntity<Semillero> updateSemillero(@RequestBody Semillero semillero) throws URISyntaxException {
        log.debug("REST request to update Semillero : {}", semillero);
        if (semillero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Semillero result = semilleroRepository.save(semillero);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, semillero.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /semilleros} : get all the semilleros.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of semilleros in body.
     */
    @GetMapping("/semilleros")
    public List<Semillero> getAllSemilleros(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Semilleros");
        return semilleroRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /semilleros/:id} : get the "id" semillero.
     *
     * @param id the id of the semillero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the semillero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/semilleros/{id}")
    public ResponseEntity<Semillero> getSemillero(@PathVariable Long id) {
        log.debug("REST request to get Semillero : {}", id);
        Optional<Semillero> semillero = semilleroRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(semillero);
    }

    /**
     * {@code DELETE  /semilleros/:id} : delete the "id" semillero.
     *
     * @param id the id of the semillero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/semilleros/{id}")
    public ResponseEntity<Void> deleteSemillero(@PathVariable Long id) {
        log.debug("REST request to delete Semillero : {}", id);
        semilleroRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
