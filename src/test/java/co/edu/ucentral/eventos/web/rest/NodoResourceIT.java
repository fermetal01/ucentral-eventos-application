package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Nodo;
import co.edu.ucentral.eventos.repository.NodoRepository;

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
 * Integration tests for the {@link NodoResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NodoResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private NodoRepository nodoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNodoMockMvc;

    private Nodo nodo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nodo createEntity(EntityManager em) {
        Nodo nodo = new Nodo()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE);
        return nodo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nodo createUpdatedEntity(EntityManager em) {
        Nodo nodo = new Nodo()
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE);
        return nodo;
    }

    @BeforeEach
    public void initTest() {
        nodo = createEntity(em);
    }

    @Test
    @Transactional
    public void createNodo() throws Exception {
        int databaseSizeBeforeCreate = nodoRepository.findAll().size();

        // Create the Nodo
        restNodoMockMvc.perform(post("/api/nodos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nodo)))
            .andExpect(status().isCreated());

        // Validate the Nodo in the database
        List<Nodo> nodoList = nodoRepository.findAll();
        assertThat(nodoList).hasSize(databaseSizeBeforeCreate + 1);
        Nodo testNodo = nodoList.get(nodoList.size() - 1);
        assertThat(testNodo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testNodo.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createNodoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nodoRepository.findAll().size();

        // Create the Nodo with an existing ID
        nodo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNodoMockMvc.perform(post("/api/nodos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nodo)))
            .andExpect(status().isBadRequest());

        // Validate the Nodo in the database
        List<Nodo> nodoList = nodoRepository.findAll();
        assertThat(nodoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNodos() throws Exception {
        // Initialize the database
        nodoRepository.saveAndFlush(nodo);

        // Get all the nodoList
        restNodoMockMvc.perform(get("/api/nodos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nodo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getNodo() throws Exception {
        // Initialize the database
        nodoRepository.saveAndFlush(nodo);

        // Get the nodo
        restNodoMockMvc.perform(get("/api/nodos/{id}", nodo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nodo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingNodo() throws Exception {
        // Get the nodo
        restNodoMockMvc.perform(get("/api/nodos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNodo() throws Exception {
        // Initialize the database
        nodoRepository.saveAndFlush(nodo);

        int databaseSizeBeforeUpdate = nodoRepository.findAll().size();

        // Update the nodo
        Nodo updatedNodo = nodoRepository.findById(nodo.getId()).get();
        // Disconnect from session so that the updates on updatedNodo are not directly saved in db
        em.detach(updatedNodo);
        updatedNodo
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE);

        restNodoMockMvc.perform(put("/api/nodos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNodo)))
            .andExpect(status().isOk());

        // Validate the Nodo in the database
        List<Nodo> nodoList = nodoRepository.findAll();
        assertThat(nodoList).hasSize(databaseSizeBeforeUpdate);
        Nodo testNodo = nodoList.get(nodoList.size() - 1);
        assertThat(testNodo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testNodo.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingNodo() throws Exception {
        int databaseSizeBeforeUpdate = nodoRepository.findAll().size();

        // Create the Nodo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNodoMockMvc.perform(put("/api/nodos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nodo)))
            .andExpect(status().isBadRequest());

        // Validate the Nodo in the database
        List<Nodo> nodoList = nodoRepository.findAll();
        assertThat(nodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNodo() throws Exception {
        // Initialize the database
        nodoRepository.saveAndFlush(nodo);

        int databaseSizeBeforeDelete = nodoRepository.findAll().size();

        // Delete the nodo
        restNodoMockMvc.perform(delete("/api/nodos/{id}", nodo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nodo> nodoList = nodoRepository.findAll();
        assertThat(nodoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
