package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.domain.ProyectoCategoria;
import co.edu.ucentral.eventos.repository.ProyectoCategoriaRepository;
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
 * REST controller for managing {@link co.edu.ucentral.eventos.domain.ProyectoCategoria}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProyectoCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(ProyectoCategoriaResource.class);

    private static final String ENTITY_NAME = "proyectoCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProyectoCategoriaRepository proyectoCategoriaRepository;

    public ProyectoCategoriaResource(ProyectoCategoriaRepository proyectoCategoriaRepository) {
        this.proyectoCategoriaRepository = proyectoCategoriaRepository;
    }

    /**
     * {@code POST  /proyecto-categorias} : Create a new proyectoCategoria.
     *
     * @param proyectoCategoria the proyectoCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proyectoCategoria, or with status {@code 400 (Bad Request)} if the proyectoCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proyecto-categorias")
    public ResponseEntity<ProyectoCategoria> createProyectoCategoria(@RequestBody ProyectoCategoria proyectoCategoria) throws URISyntaxException {
        log.debug("REST request to save ProyectoCategoria : {}", proyectoCategoria);
        if (proyectoCategoria.getId() != null) {
            throw new BadRequestAlertException("A new proyectoCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProyectoCategoria result = proyectoCategoriaRepository.save(proyectoCategoria);
        return ResponseEntity.created(new URI("/api/proyecto-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proyecto-categorias} : Updates an existing proyectoCategoria.
     *
     * @param proyectoCategoria the proyectoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proyectoCategoria,
     * or with status {@code 400 (Bad Request)} if the proyectoCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proyectoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proyecto-categorias")
    public ResponseEntity<ProyectoCategoria> updateProyectoCategoria(@RequestBody ProyectoCategoria proyectoCategoria) throws URISyntaxException {
        log.debug("REST request to update ProyectoCategoria : {}", proyectoCategoria);
        if (proyectoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProyectoCategoria result = proyectoCategoriaRepository.save(proyectoCategoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, proyectoCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /proyecto-categorias} : get all the proyectoCategorias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proyectoCategorias in body.
     */
    @GetMapping("/proyecto-categorias")
    public List<ProyectoCategoria> getAllProyectoCategorias() {
        log.debug("REST request to get all ProyectoCategorias");
        return proyectoCategoriaRepository.findAll();
    }

    /**
     * {@code GET  /proyecto-categorias/:id} : get the "id" proyectoCategoria.
     *
     * @param id the id of the proyectoCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proyectoCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proyecto-categorias/{id}")
    public ResponseEntity<ProyectoCategoria> getProyectoCategoria(@PathVariable Long id) {
        log.debug("REST request to get ProyectoCategoria : {}", id);
        Optional<ProyectoCategoria> proyectoCategoria = proyectoCategoriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(proyectoCategoria);
    }

    /**
     * {@code DELETE  /proyecto-categorias/:id} : delete the "id" proyectoCategoria.
     *
     * @param id the id of the proyectoCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proyecto-categorias/{id}")
    public ResponseEntity<Void> deleteProyectoCategoria(@PathVariable Long id) {
        log.debug("REST request to delete ProyectoCategoria : {}", id);
        proyectoCategoriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
