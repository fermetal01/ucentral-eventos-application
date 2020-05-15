package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Programa;
import co.edu.ucentral.eventos.repository.ProgramaRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Programa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProgramaResource {

    private final Logger log = LoggerFactory.getLogger(ProgramaResource.class);

    private static final String ENTITY_NAME = "programa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramaRepository programaRepository;

    public ProgramaResource(ProgramaRepository programaRepository) {
        this.programaRepository = programaRepository;
    }

    /**
     * {@code POST  /programas} : Create a new programa.
     *
     * @param programa the programa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programa, or with status {@code 400 (Bad Request)} if the programa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programas")
    public ResponseEntity<Programa> createPrograma(@RequestBody Programa programa) throws URISyntaxException {
        log.debug("REST request to save Programa : {}", programa);
        if (programa.getId() != null) {
            throw new BadRequestAlertException("A new programa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Programa result = programaRepository.save(programa);
        return ResponseEntity.created(new URI("/api/programas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programas} : Updates an existing programa.
     *
     * @param programa the programa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programa,
     * or with status {@code 400 (Bad Request)} if the programa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programas")
    public ResponseEntity<Programa> updatePrograma(@RequestBody Programa programa) throws URISyntaxException {
        log.debug("REST request to update Programa : {}", programa);
        if (programa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Programa result = programaRepository.save(programa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /programas} : get all the programas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programas in body.
     */
    @GetMapping("/programas")
    public List<Programa> getAllProgramas() {
        log.debug("REST request to get all Programas");
        return programaRepository.findAll();
    }

    /**
     * {@code GET  /programas/:id} : get the "id" programa.
     *
     * @param id the id of the programa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programas/{id}")
    public ResponseEntity<Programa> getPrograma(@PathVariable Long id) {
        log.debug("REST request to get Programa : {}", id);
        Optional<Programa> programa = programaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programa);
    }

    /**
     * {@code DELETE  /programas/:id} : delete the "id" programa.
     *
     * @param id the id of the programa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programas/{id}")
    public ResponseEntity<Void> deletePrograma(@PathVariable Long id) {
        log.debug("REST request to delete Programa : {}", id);
        programaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
