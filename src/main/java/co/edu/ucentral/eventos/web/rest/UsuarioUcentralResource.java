package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.UsuarioUcentral;
import co.edu.ucentral.eventos.repository.UsuarioUcentralRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.UsuarioUcentral}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuarioUcentralResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioUcentralResource.class);

    private static final String ENTITY_NAME = "usuarioUcentral";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuarioUcentralRepository usuarioUcentralRepository;

    public UsuarioUcentralResource(UsuarioUcentralRepository usuarioUcentralRepository) {
        this.usuarioUcentralRepository = usuarioUcentralRepository;
    }

    /**
     * {@code POST  /usuario-ucentrals} : Create a new usuarioUcentral.
     *
     * @param usuarioUcentral the usuarioUcentral to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarioUcentral, or with status {@code 400 (Bad Request)} if the usuarioUcentral has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuario-ucentrals")
    public ResponseEntity<UsuarioUcentral> createUsuarioUcentral(@RequestBody UsuarioUcentral usuarioUcentral) throws URISyntaxException {
        log.debug("REST request to save UsuarioUcentral : {}", usuarioUcentral);
        if (usuarioUcentral.getId() != null) {
            throw new BadRequestAlertException("A new usuarioUcentral cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarioUcentral result = usuarioUcentralRepository.save(usuarioUcentral);
        return ResponseEntity.created(new URI("/api/usuario-ucentrals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuario-ucentrals} : Updates an existing usuarioUcentral.
     *
     * @param usuarioUcentral the usuarioUcentral to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioUcentral,
     * or with status {@code 400 (Bad Request)} if the usuarioUcentral is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarioUcentral couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuario-ucentrals")
    public ResponseEntity<UsuarioUcentral> updateUsuarioUcentral(@RequestBody UsuarioUcentral usuarioUcentral) throws URISyntaxException {
        log.debug("REST request to update UsuarioUcentral : {}", usuarioUcentral);
        if (usuarioUcentral.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UsuarioUcentral result = usuarioUcentralRepository.save(usuarioUcentral);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, usuarioUcentral.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /usuario-ucentrals} : get all the usuarioUcentrals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarioUcentrals in body.
     */
    @GetMapping("/usuario-ucentrals")
    public List<UsuarioUcentral> getAllUsuarioUcentrals() {
        log.debug("REST request to get all UsuarioUcentrals");
        return usuarioUcentralRepository.findAll();
    }

    /**
     * {@code GET  /usuario-ucentrals/:id} : get the "id" usuarioUcentral.
     *
     * @param id the id of the usuarioUcentral to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarioUcentral, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuario-ucentrals/{id}")
    public ResponseEntity<UsuarioUcentral> getUsuarioUcentral(@PathVariable Long id) {
        log.debug("REST request to get UsuarioUcentral : {}", id);
        Optional<UsuarioUcentral> usuarioUcentral = usuarioUcentralRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarioUcentral);
    }

    /**
     * {@code DELETE  /usuario-ucentrals/:id} : delete the "id" usuarioUcentral.
     *
     * @param id the id of the usuarioUcentral to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuario-ucentrals/{id}")
    public ResponseEntity<Void> deleteUsuarioUcentral(@PathVariable Long id) {
        log.debug("REST request to delete UsuarioUcentral : {}", id);
        usuarioUcentralRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
