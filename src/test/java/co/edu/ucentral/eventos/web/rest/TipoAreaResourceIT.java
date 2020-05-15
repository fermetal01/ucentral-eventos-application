package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.TipoArea;
import co.edu.ucentral.eventos.repository.TipoAreaRepository;

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
 * Integration tests for the {@link TipoAreaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoAreaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoAreaRepository tipoAreaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoAreaMockMvc;

    private TipoArea tipoArea;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArea createEntity(EntityManager em) {
        TipoArea tipoArea = new TipoArea()
            .nombre(DEFAULT_NOMBRE);
        return tipoArea;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArea createUpdatedEntity(EntityManager em) {
        TipoArea tipoArea = new TipoArea()
            .nombre(UPDATED_NOMBRE);
        return tipoArea;
    }

    @BeforeEach
    public void initTest() {
        tipoArea = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoArea() throws Exception {
        int databaseSizeBeforeCreate = tipoAreaRepository.findAll().size();

        // Create the TipoArea
        restTipoAreaMockMvc.perform(post("/api/tipo-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArea)))
            .andExpect(status().isCreated());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoArea testTipoArea = tipoAreaList.get(tipoAreaList.size() - 1);
        assertThat(testTipoArea.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTipoAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoAreaRepository.findAll().size();

        // Create the TipoArea with an existing ID
        tipoArea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoAreaMockMvc.perform(post("/api/tipo-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArea)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoAreas() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        // Get all the tipoAreaList
        restTipoAreaMockMvc.perform(get("/api/tipo-areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoArea.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        // Get the tipoArea
        restTipoAreaMockMvc.perform(get("/api/tipo-areas/{id}", tipoArea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoArea.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingTipoArea() throws Exception {
        // Get the tipoArea
        restTipoAreaMockMvc.perform(get("/api/tipo-areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        int databaseSizeBeforeUpdate = tipoAreaRepository.findAll().size();

        // Update the tipoArea
        TipoArea updatedTipoArea = tipoAreaRepository.findById(tipoArea.getId()).get();
        // Disconnect from session so that the updates on updatedTipoArea are not directly saved in db
        em.detach(updatedTipoArea);
        updatedTipoArea
            .nombre(UPDATED_NOMBRE);

        restTipoAreaMockMvc.perform(put("/api/tipo-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoArea)))
            .andExpect(status().isOk());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeUpdate);
        TipoArea testTipoArea = tipoAreaList.get(tipoAreaList.size() - 1);
        assertThat(testTipoArea.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoArea() throws Exception {
        int databaseSizeBeforeUpdate = tipoAreaRepository.findAll().size();

        // Create the TipoArea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoAreaMockMvc.perform(put("/api/tipo-areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArea)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArea in the database
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoArea() throws Exception {
        // Initialize the database
        tipoAreaRepository.saveAndFlush(tipoArea);

        int databaseSizeBeforeDelete = tipoAreaRepository.findAll().size();

        // Delete the tipoArea
        restTipoAreaMockMvc.perform(delete("/api/tipo-areas/{id}", tipoArea.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoArea> tipoAreaList = tipoAreaRepository.findAll();
        assertThat(tipoAreaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
