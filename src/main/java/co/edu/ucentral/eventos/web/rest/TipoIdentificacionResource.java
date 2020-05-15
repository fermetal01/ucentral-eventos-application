package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.TipoIdentificacion;
import co.edu.ucentral.eventos.repository.TipoIdentificacionRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.TipoIdentificacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoIdentificacionResource {

    private final Logger log = LoggerFactory.getLogger(TipoIdentificacionResource.class);

    private static final String ENTITY_NAME = "tipoIdentificacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoIdentificacionRepository tipoIdentificacionRepository;

    public TipoIdentificacionResource(TipoIdentificacionRepository tipoIdentificacionRepository) {
        this.tipoIdentificacionRepository = tipoIdentificacionRepository;
    }

    /**
     * {@code POST  /tipo-identificacions} : Create a new tipoIdentificacion.
     *
     * @param tipoIdentificacion the tipoIdentificacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoIdentificacion, or with status {@code 400 (Bad Request)} if the tipoIdentificacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-identificacions")
    public ResponseEntity<TipoIdentificacion> createTipoIdentificacion(@RequestBody TipoIdentificacion tipoIdentificacion) throws URISyntaxException {
        log.debug("REST request to save TipoIdentificacion : {}", tipoIdentificacion);
        if (tipoIdentificacion.getId() != null) {
            throw new BadRequestAlertException("A new tipoIdentificacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoIdentificacion result = tipoIdentificacionRepository.save(tipoIdentificacion);
        return ResponseEntity.created(new URI("/api/tipo-identificacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-identificacions} : Updates an existing tipoIdentificacion.
     *
     * @param tipoIdentificacion the tipoIdentificacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoIdentificacion,
     * or with status {@code 400 (Bad Request)} if the tipoIdentificacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoIdentificacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-identificacions")
    public ResponseEntity<TipoIdentificacion> updateTipoIdentificacion(@RequestBody TipoIdentificacion tipoIdentificacion) throws URISyntaxException {
        log.debug("REST request to update TipoIdentificacion : {}", tipoIdentificacion);
        if (tipoIdentificacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoIdentificacion result = tipoIdentificacionRepository.save(tipoIdentificacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoIdentificacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-identificacions} : get all the tipoIdentificacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoIdentificacions in body.
     */
    @GetMapping("/tipo-identificacions")
    public List<TipoIdentificacion> getAllTipoIdentificacions() {
        log.debug("REST request to get all TipoIdentificacions");
        return tipoIdentificacionRepository.findAll();
    }

    /**
     * {@code GET  /tipo-identificacions/:id} : get the "id" tipoIdentificacion.
     *
     * @param id the id of the tipoIdentificacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoIdentificacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-identificacions/{id}")
    public ResponseEntity<TipoIdentificacion> getTipoIdentificacion(@PathVariable Long id) {
        log.debug("REST request to get TipoIdentificacion : {}", id);
        Optional<TipoIdentificacion> tipoIdentificacion = tipoIdentificacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoIdentificacion);
    }

    /**
     * {@code DELETE  /tipo-identificacions/:id} : delete the "id" tipoIdentificacion.
     *
     * @param id the id of the tipoIdentificacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-identificacions/{id}")
    public ResponseEntity<Void> deleteTipoIdentificacion(@PathVariable Long id) {
        log.debug("REST request to delete TipoIdentificacion : {}", id);
        tipoIdentificacionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
