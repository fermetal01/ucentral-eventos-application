package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Institucion;
import co.edu.ucentral.eventos.repository.InstitucionRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Institucion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InstitucionResource {

    private final Logger log = LoggerFactory.getLogger(InstitucionResource.class);

    private static final String ENTITY_NAME = "institucion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstitucionRepository institucionRepository;

    public InstitucionResource(InstitucionRepository institucionRepository) {
        this.institucionRepository = institucionRepository;
    }

    /**
     * {@code POST  /institucions} : Create a new institucion.
     *
     * @param institucion the institucion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new institucion, or with status {@code 400 (Bad Request)} if the institucion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/institucions")
    public ResponseEntity<Institucion> createInstitucion(@RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to save Institucion : {}", institucion);
        if (institucion.getId() != null) {
            throw new BadRequestAlertException("A new institucion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Institucion result = institucionRepository.save(institucion);
        return ResponseEntity.created(new URI("/api/institucions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /institucions} : Updates an existing institucion.
     *
     * @param institucion the institucion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated institucion,
     * or with status {@code 400 (Bad Request)} if the institucion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the institucion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/institucions")
    public ResponseEntity<Institucion> updateInstitucion(@RequestBody Institucion institucion) throws URISyntaxException {
        log.debug("REST request to update Institucion : {}", institucion);
        if (institucion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Institucion result = institucionRepository.save(institucion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, institucion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /institucions} : get all the institucions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of institucions in body.
     */
    @GetMapping("/institucions")
    public List<Institucion> getAllInstitucions() {
        log.debug("REST request to get all Institucions");
        return institucionRepository.findAll();
    }

    /**
     * {@code GET  /institucions/:id} : get the "id" institucion.
     *
     * @param id the id of the institucion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the institucion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/institucions/{id}")
    public ResponseEntity<Institucion> getInstitucion(@PathVariable Long id) {
        log.debug("REST request to get Institucion : {}", id);
        Optional<Institucion> institucion = institucionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(institucion);
    }

    /**
     * {@code DELETE  /institucions/:id} : delete the "id" institucion.
     *
     * @param id the id of the institucion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/institucions/{id}")
    public ResponseEntity<Void> deleteInstitucion(@PathVariable Long id) {
        log.debug("REST request to delete Institucion : {}", id);
        institucionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
