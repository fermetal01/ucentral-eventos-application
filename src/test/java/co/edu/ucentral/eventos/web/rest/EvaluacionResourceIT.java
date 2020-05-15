package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Evaluacion;
import co.edu.ucentral.eventos.repository.EvaluacionRepository;

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
 * Integration tests for the {@link EvaluacionResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EvaluacionResourceIT {

    private static final Float DEFAULT_CALIFICACION = 1F;
    private static final Float UPDATED_CALIFICACION = 2F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEvaluacionMockMvc;

    private Evaluacion evaluacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluacion createEntity(EntityManager em) {
        Evaluacion evaluacion = new Evaluacion()
            .calificacion(DEFAULT_CALIFICACION)
            .observaciones(DEFAULT_OBSERVACIONES);
        return evaluacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluacion createUpdatedEntity(EntityManager em) {
        Evaluacion evaluacion = new Evaluacion()
            .calificacion(UPDATED_CALIFICACION)
            .observaciones(UPDATED_OBSERVACIONES);
        return evaluacion;
    }

    @BeforeEach
    public void initTest() {
        evaluacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluacion() throws Exception {
        int databaseSizeBeforeCreate = evaluacionRepository.findAll().size();

        // Create the Evaluacion
        restEvaluacionMockMvc.perform(post("/api/evaluacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluacion)))
            .andExpect(status().isCreated());

        // Validate the Evaluacion in the database
        List<Evaluacion> evaluacionList = evaluacionRepository.findAll();
        assertThat(evaluacionList).hasSize(databaseSizeBeforeCreate + 1);
        Evaluacion testEvaluacion = evaluacionList.get(evaluacionList.size() - 1);
        assertThat(testEvaluacion.getCalificacion()).isEqualTo(DEFAULT_CALIFICACION);
        assertThat(testEvaluacion.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void createEvaluacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluacionRepository.findAll().size();

        // Create the Evaluacion with an existing ID
        evaluacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluacionMockMvc.perform(post("/api/evaluacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluacion)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluacion in the database
        List<Evaluacion> evaluacionList = evaluacionRepository.findAll();
        assertThat(evaluacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEvaluacions() throws Exception {
        // Initialize the database
        evaluacionRepository.saveAndFlush(evaluacion);

        // Get all the evaluacionList
        restEvaluacionMockMvc.perform(get("/api/evaluacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].calificacion").value(hasItem(DEFAULT_CALIFICACION.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)));
    }
    
    @Test
    @Transactional
    public void getEvaluacion() throws Exception {
        // Initialize the database
        evaluacionRepository.saveAndFlush(evaluacion);

        // Get the evaluacion
        restEvaluacionMockMvc.perform(get("/api/evaluacions/{id}", evaluacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(evaluacion.getId().intValue()))
            .andExpect(jsonPath("$.calificacion").value(DEFAULT_CALIFICACION.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluacion() throws Exception {
        // Get the evaluacion
        restEvaluacionMockMvc.perform(get("/api/evaluacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluacion() throws Exception {
        // Initialize the database
        evaluacionRepository.saveAndFlush(evaluacion);

        int databaseSizeBeforeUpdate = evaluacionRepository.findAll().size();

        // Update the evaluacion
        Evaluacion updatedEvaluacion = evaluacionRepository.findById(evaluacion.getId()).get();
        // Disconnect from session so that the updates on updatedEvaluacion are not directly saved in db
        em.detach(updatedEvaluacion);
        updatedEvaluacion
            .calificacion(UPDATED_CALIFICACION)
            .observaciones(UPDATED_OBSERVACIONES);

        restEvaluacionMockMvc.perform(put("/api/evaluacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluacion)))
            .andExpect(status().isOk());

        // Validate the Evaluacion in the database
        List<Evaluacion> evaluacionList = evaluacionRepository.findAll();
        assertThat(evaluacionList).hasSize(databaseSizeBeforeUpdate);
        Evaluacion testEvaluacion = evaluacionList.get(evaluacionList.size() - 1);
        assertThat(testEvaluacion.getCalificacion()).isEqualTo(UPDATED_CALIFICACION);
        assertThat(testEvaluacion.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluacion() throws Exception {
        int databaseSizeBeforeUpdate = evaluacionRepository.findAll().size();

        // Create the Evaluacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEvaluacionMockMvc.perform(put("/api/evaluacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(evaluacion)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluacion in the database
        List<Evaluacion> evaluacionList = evaluacionRepository.findAll();
        assertThat(evaluacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvaluacion() throws Exception {
        // Initialize the database
        evaluacionRepository.saveAndFlush(evaluacion);

        int databaseSizeBeforeDelete = evaluacionRepository.findAll().size();

        // Delete the evaluacion
        restEvaluacionMockMvc.perform(delete("/api/evaluacions/{id}", evaluacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Evaluacion> evaluacionList = evaluacionRepository.findAll();
        assertThat(evaluacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
