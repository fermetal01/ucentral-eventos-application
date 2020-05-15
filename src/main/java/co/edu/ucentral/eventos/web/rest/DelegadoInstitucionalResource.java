package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.DelegadoInstitucional;
import co.edu.ucentral.eventos.repository.DelegadoInstitucionalRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.DelegadoInstitucional}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DelegadoInstitucionalResource {

    private final Logger log = LoggerFactory.getLogger(DelegadoInstitucionalResource.class);

    private static final String ENTITY_NAME = "delegadoInstitucional";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DelegadoInstitucionalRepository delegadoInstitucionalRepository;

    public DelegadoInstitucionalResource(DelegadoInstitucionalRepository delegadoInstitucionalRepository) {
        this.delegadoInstitucionalRepository = delegadoInstitucionalRepository;
    }

    /**
     * {@code POST  /delegado-institucionals} : Create a new delegadoInstitucional.
     *
     * @param delegadoInstitucional the delegadoInstitucional to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new delegadoInstitucional, or with status {@code 400 (Bad Request)} if the delegadoInstitucional has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/delegado-institucionals")
    public ResponseEntity<DelegadoInstitucional> createDelegadoInstitucional(@RequestBody DelegadoInstitucional delegadoInstitucional) throws URISyntaxException {
        log.debug("REST request to save DelegadoInstitucional : {}", delegadoInstitucional);
        if (delegadoInstitucional.getId() != null) {
            throw new BadRequestAlertException("A new delegadoInstitucional cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DelegadoInstitucional result = delegadoInstitucionalRepository.save(delegadoInstitucional);
        return ResponseEntity.created(new URI("/api/delegado-institucionals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /delegado-institucionals} : Updates an existing delegadoInstitucional.
     *
     * @param delegadoInstitucional the delegadoInstitucional to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated delegadoInstitucional,
     * or with status {@code 400 (Bad Request)} if the delegadoInstitucional is not valid,
     * or with status {@code 500 (Internal Server Error)} if the delegadoInstitucional couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/delegado-institucionals")
    public ResponseEntity<DelegadoInstitucional> updateDelegadoInstitucional(@RequestBody DelegadoInstitucional delegadoInstitucional) throws URISyntaxException {
        log.debug("REST request to update DelegadoInstitucional : {}", delegadoInstitucional);
        if (delegadoInstitucional.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DelegadoInstitucional result = delegadoInstitucionalRepository.save(delegadoInstitucional);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, delegadoInstitucional.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /delegado-institucionals} : get all the delegadoInstitucionals.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of delegadoInstitucionals in body.
     */
    @GetMapping("/delegado-institucionals")
    public List<DelegadoInstitucional> getAllDelegadoInstitucionals(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all DelegadoInstitucionals");
        return delegadoInstitucionalRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /delegado-institucionals/:id} : get the "id" delegadoInstitucional.
     *
     * @param id the id of the delegadoInstitucional to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the delegadoInstitucional, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/delegado-institucionals/{id}")
    public ResponseEntity<DelegadoInstitucional> getDelegadoInstitucional(@PathVariable Long id) {
        log.debug("REST request to get DelegadoInstitucional : {}", id);
        Optional<DelegadoInstitucional> delegadoInstitucional = delegadoInstitucionalRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(delegadoInstitucional);
    }

    /**
     * {@code DELETE  /delegado-institucionals/:id} : delete the "id" delegadoInstitucional.
     *
     * @param id the id of the delegadoInstitucional to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/delegado-institucionals/{id}")
    public ResponseEntity<Void> deleteDelegadoInstitucional(@PathVariable Long id) {
        log.debug("REST request to delete DelegadoInstitucional : {}", id);
        delegadoInstitucionalRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
