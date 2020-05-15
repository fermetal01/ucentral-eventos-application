package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.TipoIdentificacion;
import co.edu.ucentral.eventos.repository.TipoIdentificacionRepository;

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
 * Integration tests for the {@link TipoIdentificacionResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoIdentificacionResourceIT {

    private static final String DEFAULT_NOMBRES = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRES = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private TipoIdentificacionRepository tipoIdentificacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoIdentificacionMockMvc;

    private TipoIdentificacion tipoIdentificacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoIdentificacion createEntity(EntityManager em) {
        TipoIdentificacion tipoIdentificacion = new TipoIdentificacion()
            .nombres(DEFAULT_NOMBRES)
            .codigo(DEFAULT_CODIGO);
        return tipoIdentificacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoIdentificacion createUpdatedEntity(EntityManager em) {
        TipoIdentificacion tipoIdentificacion = new TipoIdentificacion()
            .nombres(UPDATED_NOMBRES)
            .codigo(UPDATED_CODIGO);
        return tipoIdentificacion;
    }

    @BeforeEach
    public void initTest() {
        tipoIdentificacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoIdentificacion() throws Exception {
        int databaseSizeBeforeCreate = tipoIdentificacionRepository.findAll().size();

        // Create the TipoIdentificacion
        restTipoIdentificacionMockMvc.perform(post("/api/tipo-identificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoIdentificacion)))
            .andExpect(status().isCreated());

        // Validate the TipoIdentificacion in the database
        List<TipoIdentificacion> tipoIdentificacionList = tipoIdentificacionRepository.findAll();
        assertThat(tipoIdentificacionList).hasSize(databaseSizeBeforeCreate + 1);
        TipoIdentificacion testTipoIdentificacion = tipoIdentificacionList.get(tipoIdentificacionList.size() - 1);
        assertThat(testTipoIdentificacion.getNombres()).isEqualTo(DEFAULT_NOMBRES);
        assertThat(testTipoIdentificacion.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createTipoIdentificacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoIdentificacionRepository.findAll().size();

        // Create the TipoIdentificacion with an existing ID
        tipoIdentificacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoIdentificacionMockMvc.perform(post("/api/tipo-identificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoIdentificacion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoIdentificacion in the database
        List<TipoIdentificacion> tipoIdentificacionList = tipoIdentificacionRepository.findAll();
        assertThat(tipoIdentificacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoIdentificacions() throws Exception {
        // Initialize the database
        tipoIdentificacionRepository.saveAndFlush(tipoIdentificacion);

        // Get all the tipoIdentificacionList
        restTipoIdentificacionMockMvc.perform(get("/api/tipo-identificacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoIdentificacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombres").value(hasItem(DEFAULT_NOMBRES)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @Test
    @Transactional
    public void getTipoIdentificacion() throws Exception {
        // Initialize the database
        tipoIdentificacionRepository.saveAndFlush(tipoIdentificacion);

        // Get the tipoIdentificacion
        restTipoIdentificacionMockMvc.perform(get("/api/tipo-identificacions/{id}", tipoIdentificacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoIdentificacion.getId().intValue()))
            .andExpect(jsonPath("$.nombres").value(DEFAULT_NOMBRES))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    public void getNonExistingTipoIdentificacion() throws Exception {
        // Get the tipoIdentificacion
        restTipoIdentificacionMockMvc.perform(get("/api/tipo-identificacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoIdentificacion() throws Exception {
        // Initialize the database
        tipoIdentificacionRepository.saveAndFlush(tipoIdentificacion);

        int databaseSizeBeforeUpdate = tipoIdentificacionRepository.findAll().size();

        // Update the tipoIdentificacion
        TipoIdentificacion updatedTipoIdentificacion = tipoIdentificacionRepository.findById(tipoIdentificacion.getId()).get();
        // Disconnect from session so that the updates on updatedTipoIdentificacion are not directly saved in db
        em.detach(updatedTipoIdentificacion);
        updatedTipoIdentificacion
            .nombres(UPDATED_NOMBRES)
            .codigo(UPDATED_CODIGO);

        restTipoIdentificacionMockMvc.perform(put("/api/tipo-identificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoIdentificacion)))
            .andExpect(status().isOk());

        // Validate the TipoIdentificacion in the database
        List<TipoIdentificacion> tipoIdentificacionList = tipoIdentificacionRepository.findAll();
        assertThat(tipoIdentificacionList).hasSize(databaseSizeBeforeUpdate);
        TipoIdentificacion testTipoIdentificacion = tipoIdentificacionList.get(tipoIdentificacionList.size() - 1);
        assertThat(testTipoIdentificacion.getNombres()).isEqualTo(UPDATED_NOMBRES);
        assertThat(testTipoIdentificacion.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoIdentificacion() throws Exception {
        int databaseSizeBeforeUpdate = tipoIdentificacionRepository.findAll().size();

        // Create the TipoIdentificacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoIdentificacionMockMvc.perform(put("/api/tipo-identificacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoIdentificacion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoIdentificacion in the database
        List<TipoIdentificacion> tipoIdentificacionList = tipoIdentificacionRepository.findAll();
        assertThat(tipoIdentificacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoIdentificacion() throws Exception {
        // Initialize the database
        tipoIdentificacionRepository.saveAndFlush(tipoIdentificacion);

        int databaseSizeBeforeDelete = tipoIdentificacionRepository.findAll().size();

        // Delete the tipoIdentificacion
        restTipoIdentificacionMockMvc.perform(delete("/api/tipo-identificacions/{id}", tipoIdentificacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoIdentificacion> tipoIdentificacionList = tipoIdentificacionRepository.findAll();
        assertThat(tipoIdentificacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
