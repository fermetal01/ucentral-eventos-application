package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Ciudad;
import co.edu.ucentral.eventos.repository.CiudadRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Ciudad}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CiudadResource {

    private final Logger log = LoggerFactory.getLogger(CiudadResource.class);

    private static final String ENTITY_NAME = "ciudad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CiudadRepository ciudadRepository;

    public CiudadResource(CiudadRepository ciudadRepository) {
        this.ciudadRepository = ciudadRepository;
    }

    /**
     * {@code POST  /ciudads} : Create a new ciudad.
     *
     * @param ciudad the ciudad to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ciudad, or with status {@code 400 (Bad Request)} if the ciudad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ciudads")
    public ResponseEntity<Ciudad> createCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to save Ciudad : {}", ciudad);
        if (ciudad.getId() != null) {
            throw new BadRequestAlertException("A new ciudad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ciudad result = ciudadRepository.save(ciudad);
        return ResponseEntity.created(new URI("/api/ciudads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ciudads} : Updates an existing ciudad.
     *
     * @param ciudad the ciudad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ciudad,
     * or with status {@code 400 (Bad Request)} if the ciudad is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ciudad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ciudads")
    public ResponseEntity<Ciudad> updateCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to update Ciudad : {}", ciudad);
        if (ciudad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ciudad result = ciudadRepository.save(ciudad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ciudad.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ciudads} : get all the ciudads.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ciudads in body.
     */
    @GetMapping("/ciudads")
    public List<Ciudad> getAllCiudads() {
        log.debug("REST request to get all Ciudads");
        return ciudadRepository.findAll();
    }

    /**
     * {@code GET  /ciudads/:id} : get the "id" ciudad.
     *
     * @param id the id of the ciudad to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ciudad, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ciudads/{id}")
    public ResponseEntity<Ciudad> getCiudad(@PathVariable Long id) {
        log.debug("REST request to get Ciudad : {}", id);
        Optional<Ciudad> ciudad = ciudadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ciudad);
    }

    /**
     * {@code DELETE  /ciudads/:id} : delete the "id" ciudad.
     *
     * @param id the id of the ciudad to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ciudads/{id}")
    public ResponseEntity<Void> deleteCiudad(@PathVariable Long id) {
        log.debug("REST request to delete Ciudad : {}", id);
        ciudadRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
