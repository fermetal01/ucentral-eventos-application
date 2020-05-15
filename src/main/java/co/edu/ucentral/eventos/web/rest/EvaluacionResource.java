package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Evaluacion;
import co.edu.ucentral.eventos.repository.EvaluacionRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Evaluacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EvaluacionResource {

    private final Logger log = LoggerFactory.getLogger(EvaluacionResource.class);

    private static final String ENTITY_NAME = "evaluacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EvaluacionRepository evaluacionRepository;

    public EvaluacionResource(EvaluacionRepository evaluacionRepository) {
        this.evaluacionRepository = evaluacionRepository;
    }

    /**
     * {@code POST  /evaluacions} : Create a new evaluacion.
     *
     * @param evaluacion the evaluacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new evaluacion, or with status {@code 400 (Bad Request)} if the evaluacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evaluacions")
    public ResponseEntity<Evaluacion> createEvaluacion(@RequestBody Evaluacion evaluacion) throws URISyntaxException {
        log.debug("REST request to save Evaluacion : {}", evaluacion);
        if (evaluacion.getId() != null) {
            throw new BadRequestAlertException("A new evaluacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Evaluacion result = evaluacionRepository.save(evaluacion);
        return ResponseEntity.created(new URI("/api/evaluacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evaluacions} : Updates an existing evaluacion.
     *
     * @param evaluacion the evaluacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated evaluacion,
     * or with status {@code 400 (Bad Request)} if the evaluacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the evaluacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evaluacions")
    public ResponseEntity<Evaluacion> updateEvaluacion(@RequestBody Evaluacion evaluacion) throws URISyntaxException {
        log.debug("REST request to update Evaluacion : {}", evaluacion);
        if (evaluacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Evaluacion result = evaluacionRepository.save(evaluacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, evaluacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evaluacions} : get all the evaluacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of evaluacions in body.
     */
    @GetMapping("/evaluacions")
    public List<Evaluacion> getAllEvaluacions() {
        log.debug("REST request to get all Evaluacions");
        return evaluacionRepository.findAll();
    }

    /**
     * {@code GET  /evaluacions/:id} : get the "id" evaluacion.
     *
     * @param id the id of the evaluacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the evaluacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evaluacions/{id}")
    public ResponseEntity<Evaluacion> getEvaluacion(@PathVariable Long id) {
        log.debug("REST request to get Evaluacion : {}", id);
        Optional<Evaluacion> evaluacion = evaluacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(evaluacion);
    }

    /**
     * {@code DELETE  /evaluacions/:id} : delete the "id" evaluacion.
     *
     * @param id the id of the evaluacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evaluacions/{id}")
    public ResponseEntity<Void> deleteEvaluacion(@PathVariable Long id) {
        log.debug("REST request to delete Evaluacion : {}", id);
        evaluacionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
