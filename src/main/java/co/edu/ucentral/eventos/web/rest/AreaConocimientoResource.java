package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.AreaConocimiento;
import co.edu.ucentral.eventos.repository.AreaConocimientoRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.AreaConocimiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AreaConocimientoResource {

    private final Logger log = LoggerFactory.getLogger(AreaConocimientoResource.class);

    private static final String ENTITY_NAME = "areaConocimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AreaConocimientoRepository areaConocimientoRepository;

    public AreaConocimientoResource(AreaConocimientoRepository areaConocimientoRepository) {
        this.areaConocimientoRepository = areaConocimientoRepository;
    }

    /**
     * {@code POST  /area-conocimientos} : Create a new areaConocimiento.
     *
     * @param areaConocimiento the areaConocimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new areaConocimiento, or with status {@code 400 (Bad Request)} if the areaConocimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/area-conocimientos")
    public ResponseEntity<AreaConocimiento> createAreaConocimiento(@RequestBody AreaConocimiento areaConocimiento) throws URISyntaxException {
        log.debug("REST request to save AreaConocimiento : {}", areaConocimiento);
        if (areaConocimiento.getId() != null) {
            throw new BadRequestAlertException("A new areaConocimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AreaConocimiento result = areaConocimientoRepository.save(areaConocimiento);
        return ResponseEntity.created(new URI("/api/area-conocimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /area-conocimientos} : Updates an existing areaConocimiento.
     *
     * @param areaConocimiento the areaConocimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated areaConocimiento,
     * or with status {@code 400 (Bad Request)} if the areaConocimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the areaConocimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/area-conocimientos")
    public ResponseEntity<AreaConocimiento> updateAreaConocimiento(@RequestBody AreaConocimiento areaConocimiento) throws URISyntaxException {
        log.debug("REST request to update AreaConocimiento : {}", areaConocimiento);
        if (areaConocimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AreaConocimiento result = areaConocimientoRepository.save(areaConocimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, areaConocimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /area-conocimientos} : get all the areaConocimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of areaConocimientos in body.
     */
    @GetMapping("/area-conocimientos")
    public List<AreaConocimiento> getAllAreaConocimientos() {
        log.debug("REST request to get all AreaConocimientos");
        return areaConocimientoRepository.findAll();
    }

    /**
     * {@code GET  /area-conocimientos/:id} : get the "id" areaConocimiento.
     *
     * @param id the id of the areaConocimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the areaConocimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/area-conocimientos/{id}")
    public ResponseEntity<AreaConocimiento> getAreaConocimiento(@PathVariable Long id) {
        log.debug("REST request to get AreaConocimiento : {}", id);
        Optional<AreaConocimiento> areaConocimiento = areaConocimientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(areaConocimiento);
    }

    /**
     * {@code DELETE  /area-conocimientos/:id} : delete the "id" areaConocimiento.
     *
     * @param id the id of the areaConocimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/area-conocimientos/{id}")
    public ResponseEntity<Void> deleteAreaConocimiento(@PathVariable Long id) {
        log.debug("REST request to delete AreaConocimiento : {}", id);
        areaConocimientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
