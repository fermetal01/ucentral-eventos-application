package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.Regla;
import co.edu.ucentral.eventos.repository.ReglaRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.Regla}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReglaResource {

    private final Logger log = LoggerFactory.getLogger(ReglaResource.class);

    private static final String ENTITY_NAME = "regla";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReglaRepository reglaRepository;

    public ReglaResource(ReglaRepository reglaRepository) {
        this.reglaRepository = reglaRepository;
    }

    /**
     * {@code POST  /reglas} : Create a new regla.
     *
     * @param regla the regla to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regla, or with status {@code 400 (Bad Request)} if the regla has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reglas")
    public ResponseEntity<Regla> createRegla(@RequestBody Regla regla) throws URISyntaxException {
        log.debug("REST request to save Regla : {}", regla);
        if (regla.getId() != null) {
            throw new BadRequestAlertException("A new regla cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Regla result = reglaRepository.save(regla);
        return ResponseEntity.created(new URI("/api/reglas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reglas} : Updates an existing regla.
     *
     * @param regla the regla to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regla,
     * or with status {@code 400 (Bad Request)} if the regla is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regla couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reglas")
    public ResponseEntity<Regla> updateRegla(@RequestBody Regla regla) throws URISyntaxException {
        log.debug("REST request to update Regla : {}", regla);
        if (regla.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Regla result = reglaRepository.save(regla);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regla.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reglas} : get all the reglas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reglas in body.
     */
    @GetMapping("/reglas")
    public List<Regla> getAllReglas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Reglas");
        return reglaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /reglas/:id} : get the "id" regla.
     *
     * @param id the id of the regla to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regla, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reglas/{id}")
    public ResponseEntity<Regla> getRegla(@PathVariable Long id) {
        log.debug("REST request to get Regla : {}", id);
        Optional<Regla> regla = reglaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(regla);
    }

    /**
     * {@code DELETE  /reglas/:id} : delete the "id" regla.
     *
     * @param id the id of the regla to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reglas/{id}")
    public ResponseEntity<Void> deleteRegla(@PathVariable Long id) {
        log.debug("REST request to delete Regla : {}", id);
        reglaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
