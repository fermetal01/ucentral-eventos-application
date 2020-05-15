package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Ponencia;
import co.edu.ucentral.eventos.repository.PonenciaRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Ponencia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PonenciaResource {

    private final Logger log = LoggerFactory.getLogger(PonenciaResource.class);

    private static final String ENTITY_NAME = "ponencia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PonenciaRepository ponenciaRepository;

    public PonenciaResource(PonenciaRepository ponenciaRepository) {
        this.ponenciaRepository = ponenciaRepository;
    }

    /**
     * {@code POST  /ponencias} : Create a new ponencia.
     *
     * @param ponencia the ponencia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ponencia, or with status {@code 400 (Bad Request)} if the ponencia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ponencias")
    public ResponseEntity<Ponencia> createPonencia(@RequestBody Ponencia ponencia) throws URISyntaxException {
        log.debug("REST request to save Ponencia : {}", ponencia);
        if (ponencia.getId() != null) {
            throw new BadRequestAlertException("A new ponencia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ponencia result = ponenciaRepository.save(ponencia);
        return ResponseEntity.created(new URI("/api/ponencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ponencias} : Updates an existing ponencia.
     *
     * @param ponencia the ponencia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ponencia,
     * or with status {@code 400 (Bad Request)} if the ponencia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ponencia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ponencias")
    public ResponseEntity<Ponencia> updatePonencia(@RequestBody Ponencia ponencia) throws URISyntaxException {
        log.debug("REST request to update Ponencia : {}", ponencia);
        if (ponencia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ponencia result = ponenciaRepository.save(ponencia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ponencia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ponencias} : get all the ponencias.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ponencias in body.
     */
    @GetMapping("/ponencias")
    public List<Ponencia> getAllPonencias(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Ponencias");
        return ponenciaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /ponencias/:id} : get the "id" ponencia.
     *
     * @param id the id of the ponencia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ponencia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ponencias/{id}")
    public ResponseEntity<Ponencia> getPonencia(@PathVariable Long id) {
        log.debug("REST request to get Ponencia : {}", id);
        Optional<Ponencia> ponencia = ponenciaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(ponencia);
    }

    /**
     * {@code DELETE  /ponencias/:id} : delete the "id" ponencia.
     *
     * @param id the id of the ponencia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ponencias/{id}")
    public ResponseEntity<Void> deletePonencia(@PathVariable Long id) {
        log.debug("REST request to delete Ponencia : {}", id);
        ponenciaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
