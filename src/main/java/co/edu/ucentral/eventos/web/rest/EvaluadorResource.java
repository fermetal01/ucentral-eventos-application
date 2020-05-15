package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Evaluador;
import co.edu.ucentral.eventos.repository.EvaluadorRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Evaluador}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EvaluadorResource {

    private final Logger log = LoggerFactory.getLogger(EvaluadorResource.class);

    private static final String ENTITY_NAME = "evaluador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EvaluadorRepository evaluadorRepository;

    public EvaluadorResource(EvaluadorRepository evaluadorRepository) {
        this.evaluadorRepository = evaluadorRepository;
    }

    /**
     * {@code POST  /evaluadors} : Create a new evaluador.
     *
     * @param evaluador the evaluador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new evaluador, or with status {@code 400 (Bad Request)} if the evaluador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evaluadors")
    public ResponseEntity<Evaluador> createEvaluador(@RequestBody Evaluador evaluador) throws URISyntaxException {
        log.debug("REST request to save Evaluador : {}", evaluador);
        if (evaluador.getId() != null) {
            throw new BadRequestAlertException("A new evaluador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Evaluador result = evaluadorRepository.save(evaluador);
        return ResponseEntity.created(new URI("/api/evaluadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evaluadors} : Updates an existing evaluador.
     *
     * @param evaluador the evaluador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated evaluador,
     * or with status {@code 400 (Bad Request)} if the evaluador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the evaluador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evaluadors")
    public ResponseEntity<Evaluador> updateEvaluador(@RequestBody Evaluador evaluador) throws URISyntaxException {
        log.debug("REST request to update Evaluador : {}", evaluador);
        if (evaluador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Evaluador result = evaluadorRepository.save(evaluador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, evaluador.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evaluadors} : get all the evaluadors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of evaluadors in body.
     */
    @GetMapping("/evaluadors")
    public List<Evaluador> getAllEvaluadors() {
        log.debug("REST request to get all Evaluadors");
        return evaluadorRepository.findAll();
    }

    /**
     * {@code GET  /evaluadors/:id} : get the "id" evaluador.
     *
     * @param id the id of the evaluador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the evaluador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evaluadors/{id}")
    public ResponseEntity<Evaluador> getEvaluador(@PathVariable Long id) {
        log.debug("REST request to get Evaluador : {}", id);
        Optional<Evaluador> evaluador = evaluadorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(evaluador);
    }

    /**
     * {@code DELETE  /evaluadors/:id} : delete the "id" evaluador.
     *
     * @param id the id of the evaluador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evaluadors/{id}")
    public ResponseEntity<Void> deleteEvaluador(@PathVariable Long id) {
        log.debug("REST request to delete Evaluador : {}", id);
        evaluadorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
