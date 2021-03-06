package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Nodo;
import co.edu.ucentral.eventos.repository.NodoRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Nodo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NodoResource {

    private final Logger log = LoggerFactory.getLogger(NodoResource.class);

    private static final String ENTITY_NAME = "nodo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NodoRepository nodoRepository;

    public NodoResource(NodoRepository nodoRepository) {
        this.nodoRepository = nodoRepository;
    }

    /**
     * {@code POST  /nodos} : Create a new nodo.
     *
     * @param nodo the nodo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nodo, or with status {@code 400 (Bad Request)} if the nodo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nodos")
    public ResponseEntity<Nodo> createNodo(@RequestBody Nodo nodo) throws URISyntaxException {
        log.debug("REST request to save Nodo : {}", nodo);
        if (nodo.getId() != null) {
            throw new BadRequestAlertException("A new nodo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nodo result = nodoRepository.save(nodo);
        return ResponseEntity.created(new URI("/api/nodos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nodos} : Updates an existing nodo.
     *
     * @param nodo the nodo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nodo,
     * or with status {@code 400 (Bad Request)} if the nodo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nodo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nodos")
    public ResponseEntity<Nodo> updateNodo(@RequestBody Nodo nodo) throws URISyntaxException {
        log.debug("REST request to update Nodo : {}", nodo);
        if (nodo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nodo result = nodoRepository.save(nodo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nodo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nodos} : get all the nodos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nodos in body.
     */
    @GetMapping("/nodos")
    public List<Nodo> getAllNodos() {
        log.debug("REST request to get all Nodos");
        return nodoRepository.findAll();
    }

    /**
     * {@code GET  /nodos/:id} : get the "id" nodo.
     *
     * @param id the id of the nodo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nodo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nodos/{id}")
    public ResponseEntity<Nodo> getNodo(@PathVariable Long id) {
        log.debug("REST request to get Nodo : {}", id);
        Optional<Nodo> nodo = nodoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nodo);
    }

    /**
     * {@code DELETE  /nodos/:id} : delete the "id" nodo.
     *
     * @param id the id of the nodo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nodos/{id}")
    public ResponseEntity<Void> deleteNodo(@PathVariable Long id) {
        log.debug("REST request to delete Nodo : {}", id);
        nodoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
