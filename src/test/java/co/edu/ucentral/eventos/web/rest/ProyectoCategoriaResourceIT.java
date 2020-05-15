package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.ProyectoCategoria;
import co.edu.ucentral.eventos.repository.ProyectoCategoriaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProyectoCategoriaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProyectoCategoriaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ProyectoCategoriaRepository proyectoCategoriaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProyectoCategoriaMockMvc;

    private ProyectoCategoria proyectoCategoria;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProyectoCategoria createEntity(EntityManager em) {
        ProyectoCategoria proyectoCategoria = new ProyectoCategoria()
            .nombre(DEFAULT_NOMBRE);
        return proyectoCategoria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProyectoCategoria createUpdatedEntity(EntityManager em) {
        ProyectoCategoria proyectoCategoria = new ProyectoCategoria()
            .nombre(UPDATED_NOMBRE);
        return proyectoCategoria;
    }

    @BeforeEach
    public void initTest() {
        proyectoCategoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createProyectoCategoria() throws Exception {
        int databaseSizeBeforeCreate = proyectoCategoriaRepository.findAll().size();

        // Create the ProyectoCategoria
        restProyectoCategoriaMockMvc.perform(post("/api/proyecto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyectoCategoria)))
            .andExpect(status().isCreated());

        // Validate the ProyectoCategoria in the database
        List<ProyectoCategoria> proyectoCategoriaList = proyectoCategoriaRepository.findAll();
        assertThat(proyectoCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        ProyectoCategoria testProyectoCategoria = proyectoCategoriaList.get(proyectoCategoriaList.size() - 1);
        assertThat(testProyectoCategoria.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createProyectoCategoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proyectoCategoriaRepository.findAll().size();

        // Create the ProyectoCategoria with an existing ID
        proyectoCategoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProyectoCategoriaMockMvc.perform(post("/api/proyecto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyectoCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the ProyectoCategoria in the database
        List<ProyectoCategoria> proyectoCategoriaList = proyectoCategoriaRepository.findAll();
        assertThat(proyectoCategoriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProyectoCategorias() throws Exception {
        // Initialize the database
        proyectoCategoriaRepository.saveAndFlush(proyectoCategoria);

        // Get all the proyectoCategoriaList
        restProyectoCategoriaMockMvc.perform(get("/api/proyecto-categorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proyectoCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getProyectoCategoria() throws Exception {
        // Initialize the database
        proyectoCategoriaRepository.saveAndFlush(proyectoCategoria);

        // Get the proyectoCategoria
        restProyectoCategoriaMockMvc.perform(get("/api/proyecto-categorias/{id}", proyectoCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(proyectoCategoria.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingProyectoCategoria() throws Exception {
        // Get the proyectoCategoria
        restProyectoCategoriaMockMvc.perform(get("/api/proyecto-categorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProyectoCategoria() throws Exception {
        // Initialize the database
        proyectoCategoriaRepository.saveAndFlush(proyectoCategoria);

        int databaseSizeBeforeUpdate = proyectoCategoriaRepository.findAll().size();

        // Update the proyectoCategoria
        ProyectoCategoria updatedProyectoCategoria = proyectoCategoriaRepository.findById(proyectoCategoria.getId()).get();
        // Disconnect from session so that the updates on updatedProyectoCategoria are not directly saved in db
        em.detach(updatedProyectoCategoria);
        updatedProyectoCategoria
            .nombre(UPDATED_NOMBRE);

        restProyectoCategoriaMockMvc.perform(put("/api/proyecto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProyectoCategoria)))
            .andExpect(status().isOk());

        // Validate the ProyectoCategoria in the database
        List<ProyectoCategoria> proyectoCategoriaList = proyectoCategoriaRepository.findAll();
        assertThat(proyectoCategoriaList).hasSize(databaseSizeBeforeUpdate);
        ProyectoCategoria testProyectoCategoria = proyectoCategoriaList.get(proyectoCategoriaList.size() - 1);
        assertThat(testProyectoCategoria.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingProyectoCategoria() throws Exception {
        int databaseSizeBeforeUpdate = proyectoCategoriaRepository.findAll().size();

        // Create the ProyectoCategoria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProyectoCategoriaMockMvc.perform(put("/api/proyecto-categorias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(proyectoCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the ProyectoCategoria in the database
        List<ProyectoCategoria> proyectoCategoriaList = proyectoCategoriaRepository.findAll();
        assertThat(proyectoCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProyectoCategoria() throws Exception {
        // Initialize the database
        proyectoCategoriaRepository.saveAndFlush(proyectoCategoria);

        int databaseSizeBeforeDelete = proyectoCategoriaRepository.findAll().size();

        // Delete the proyectoCategoria
        restProyectoCategoriaMockMvc.perform(delete("/api/proyecto-categorias/{id}", proyectoCategoria.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProyectoCategoria> proyectoCategoriaList = proyectoCategoriaRepository.findAll();
        assertThat(proyectoCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
