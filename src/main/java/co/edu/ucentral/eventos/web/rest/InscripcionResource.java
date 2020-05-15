package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Inscripcion;
import co.edu.ucentral.eventos.repository.InscripcionRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Inscripcion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InscripcionResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionResource.class);

    private static final String ENTITY_NAME = "inscripcion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionRepository inscripcionRepository;

    public InscripcionResource(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    /**
     * {@code POST  /inscripcions} : Create a new inscripcion.
     *
     * @param inscripcion the inscripcion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcion, or with status {@code 400 (Bad Request)} if the inscripcion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcions")
    public ResponseEntity<Inscripcion> createInscripcion(@RequestBody Inscripcion inscripcion) throws URISyntaxException {
        log.debug("REST request to save Inscripcion : {}", inscripcion);
        if (inscripcion.getId() != null) {
            throw new BadRequestAlertException("A new inscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inscripcion result = inscripcionRepository.save(inscripcion);
        return ResponseEntity.created(new URI("/api/inscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcions} : Updates an existing inscripcion.
     *
     * @param inscripcion the inscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcion,
     * or with status {@code 400 (Bad Request)} if the inscripcion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcions")
    public ResponseEntity<Inscripcion> updateInscripcion(@RequestBody Inscripcion inscripcion) throws URISyntaxException {
        log.debug("REST request to update Inscripcion : {}", inscripcion);
        if (inscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Inscripcion result = inscripcionRepository.save(inscripcion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /inscripcions} : get all the inscripcions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcions in body.
     */
    @GetMapping("/inscripcions")
    public List<Inscripcion> getAllInscripcions() {
        log.debug("REST request to get all Inscripcions");
        return inscripcionRepository.findAll();
    }

    /**
     * {@code GET  /inscripcions/:id} : get the "id" inscripcion.
     *
     * @param id the id of the inscripcion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcions/{id}")
    public ResponseEntity<Inscripcion> getInscripcion(@PathVariable Long id) {
        log.debug("REST request to get Inscripcion : {}", id);
        Optional<Inscripcion> inscripcion = inscripcionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inscripcion);
    }

    /**
     * {@code DELETE  /inscripcions/:id} : delete the "id" inscripcion.
     *
     * @param id the id of the inscripcion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcions/{id}")
    public ResponseEntity<Void> deleteInscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Inscripcion : {}", id);
        inscripcionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
