package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.TipoArea;
import co.edu.ucentral.eventos.repository.TipoAreaRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.TipoArea}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoAreaResource {

    private final Logger log = LoggerFactory.getLogger(TipoAreaResource.class);

    private static final String ENTITY_NAME = "tipoArea";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAreaRepository tipoAreaRepository;

    public TipoAreaResource(TipoAreaRepository tipoAreaRepository) {
        this.tipoAreaRepository = tipoAreaRepository;
    }

    /**
     * {@code POST  /tipo-areas} : Create a new tipoArea.
     *
     * @param tipoArea the tipoArea to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoArea, or with status {@code 400 (Bad Request)} if the tipoArea has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-areas")
    public ResponseEntity<TipoArea> createTipoArea(@RequestBody TipoArea tipoArea) throws URISyntaxException {
        log.debug("REST request to save TipoArea : {}", tipoArea);
        if (tipoArea.getId() != null) {
            throw new BadRequestAlertException("A new tipoArea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoArea result = tipoAreaRepository.save(tipoArea);
        return ResponseEntity.created(new URI("/api/tipo-areas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-areas} : Updates an existing tipoArea.
     *
     * @param tipoArea the tipoArea to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoArea,
     * or with status {@code 400 (Bad Request)} if the tipoArea is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoArea couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-areas")
    public ResponseEntity<TipoArea> updateTipoArea(@RequestBody TipoArea tipoArea) throws URISyntaxException {
        log.debug("REST request to update TipoArea : {}", tipoArea);
        if (tipoArea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoArea result = tipoAreaRepository.save(tipoArea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoArea.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-areas} : get all the tipoAreas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAreas in body.
     */
    @GetMapping("/tipo-areas")
    public List<TipoArea> getAllTipoAreas() {
        log.debug("REST request to get all TipoAreas");
        return tipoAreaRepository.findAll();
    }

    /**
     * {@code GET  /tipo-areas/:id} : get the "id" tipoArea.
     *
     * @param id the id of the tipoArea to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoArea, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-areas/{id}")
    public ResponseEntity<TipoArea> getTipoArea(@PathVariable Long id) {
        log.debug("REST request to get TipoArea : {}", id);
        Optional<TipoArea> tipoArea = tipoAreaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoArea);
    }

    /**
     * {@code DELETE  /tipo-areas/:id} : delete the "id" tipoArea.
     *
     * @param id the id of the tipoArea to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-areas/{id}")
    public ResponseEntity<Void> deleteTipoArea(@PathVariable Long id) {
        log.debug("REST request to delete TipoArea : {}", id);
        tipoAreaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
