package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Evaluador;
import co.edu.ucentral.eventos.repository.EvaluadorRepository;

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
 * Integration tests for the {@link EvaluadorResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EvaluadorResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    @Autowired
    private EvaluadorRepository evaluadorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEvaluadorMockMvc;

    private Evaluador evaluador;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluador createEntity(EntityManager em) {
        Evaluador evaluador = new Evaluador()
            .codigo(DEFAULT_CODIGO)
            .activo(DEFAULT_ACTIVO);
        return evaluador;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluador createUpdatedEntity(EntityManager em) {
        Evaluador evaluador = new Evaluador()
            .codigo(UPDATED_CODIGO)
            .activo(UPDATED_ACTIVO);
        return evaluador;
    }

    @BeforeEach
    public void initTest() {
        evaluador = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluador() throws Exception {
        int databaseSizeBeforeCreate = evaluadorRepository.findAll().size();

        // Create the Evaluador
        restEvaluadorMockMvc.perform(post("/api/evaluadors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluador)))
            .andExpect(status().isCreated());

        // Validate the Evaluador in the database
        List<Evaluador> evaluadorList = evaluadorRepository.findAll();
        assertThat(evaluadorList).hasSize(databaseSizeBeforeCreate + 1);
        Evaluador testEvaluador = evaluadorList.get(evaluadorList.size() - 1);
        assertThat(testEvaluador.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testEvaluador.isActivo()).isEqualTo(DEFAULT_ACTIVO);
    }

    @Test
    @Transactional
    public void createEvaluadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluadorRepository.findAll().size();

        // Create the Evaluador with an existing ID
        evaluador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluadorMockMvc.perform(post("/api/evaluadors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluador)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluador in the database
        List<Evaluador> evaluadorList = evaluadorRepository.findAll();
        assertThat(evaluadorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEvaluadors() throws Exception {
        // Initialize the database
        evaluadorRepository.saveAndFlush(evaluador);

        // Get all the evaluadorList
        restEvaluadorMockMvc.perform(get("/api/evaluadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluador.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEvaluador() throws Exception {
        // Initialize the database
        evaluadorRepository.saveAndFlush(evaluador);

        // Get the evaluador
        restEvaluadorMockMvc.perform(get("/api/evaluadors/{id}", evaluador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(evaluador.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluador() throws Exception {
        // Get the evaluador
        restEvaluadorMockMvc.perform(get("/api/evaluadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluador() throws Exception {
        // Initialize the database
        evaluadorRepository.saveAndFlush(evaluador);

        int databaseSizeBeforeUpdate = evaluadorRepository.findAll().size();

        // Update the evaluador
        Evaluador updatedEvaluador = evaluadorRepository.findById(evaluador.getId()).get();
        // Disconnect from session so that the updates on updatedEvaluador are not directly saved in db
        em.detach(updatedEvaluador);
        updatedEvaluador
            .codigo(UPDATED_CODIGO)
            .activo(UPDATED_ACTIVO);

        restEvaluadorMockMvc.perform(put("/api/evaluadors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluador)))
            .andExpect(status().isOk());

        // Validate the Evaluador in the database
        List<Evaluador> evaluadorList = evaluadorRepository.findAll();
        assertThat(evaluadorList).hasSize(databaseSizeBeforeUpdate);
        Evaluador testEvaluador = evaluadorList.get(evaluadorList.size() - 1);
        assertThat(testEvaluador.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testEvaluador.isActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluador() throws Exception {
        int databaseSizeBeforeUpdate = evaluadorRepository.findAll().size();

        // Create the Evaluador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEvaluadorMockMvc.perform(put("/api/evaluadors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluador)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluador in the database
        List<Evaluador> evaluadorList = evaluadorRepository.findAll();
        assertThat(evaluadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvaluador() throws Exception {
        // Initialize the database
        evaluadorRepository.saveAndFlush(evaluador);

        int databaseSizeBeforeDelete = evaluadorRepository.findAll().size();

        // Delete the evaluador
        restEvaluadorMockMvc.perform(delete("/api/evaluadors/{id}", evaluador.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Evaluador> evaluadorList = evaluadorRepository.findAll();
        assertThat(evaluadorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
