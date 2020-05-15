package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Institucion;
import co.edu.ucentral.eventos.repository.InstitucionRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static co.edu.ucentral.eventos.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InstitucionResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InstitucionResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_WEB = "AAAAAAAAAA";
    private static final String UPDATED_WEB = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_REGISTRO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_REGISTRO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private InstitucionRepository institucionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInstitucionMockMvc;

    private Institucion institucion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Institucion createEntity(EntityManager em) {
        Institucion institucion = new Institucion()
            .nombre(DEFAULT_NOMBRE)
            .web(DEFAULT_WEB)
            .fechaRegistro(DEFAULT_FECHA_REGISTRO);
        return institucion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Institucion createUpdatedEntity(EntityManager em) {
        Institucion institucion = new Institucion()
            .nombre(UPDATED_NOMBRE)
            .web(UPDATED_WEB)
            .fechaRegistro(UPDATED_FECHA_REGISTRO);
        return institucion;
    }

    @BeforeEach
    public void initTest() {
        institucion = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstitucion() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isCreated());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate + 1);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testInstitucion.getWeb()).isEqualTo(DEFAULT_WEB);
        assertThat(testInstitucion.getFechaRegistro()).isEqualTo(DEFAULT_FECHA_REGISTRO);
    }

    @Test
    @Transactional
    public void createInstitucionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = institucionRepository.findAll().size();

        // Create the Institucion with an existing ID
        institucion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstitucionMockMvc.perform(post("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInstitucions() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get all the institucionList
        restInstitucionMockMvc.perform(get("/api/institucions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(institucion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].web").value(hasItem(DEFAULT_WEB)))
            .andExpect(jsonPath("$.[*].fechaRegistro").value(hasItem(sameInstant(DEFAULT_FECHA_REGISTRO))));
    }
    
    @Test
    @Transactional
    public void getInstitucion() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", institucion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(institucion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.web").value(DEFAULT_WEB))
            .andExpect(jsonPath("$.fechaRegistro").value(sameInstant(DEFAULT_FECHA_REGISTRO)));
    }

    @Test
    @Transactional
    public void getNonExistingInstitucion() throws Exception {
        // Get the institucion
        restInstitucionMockMvc.perform(get("/api/institucions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstitucion() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Update the institucion
        Institucion updatedInstitucion = institucionRepository.findById(institucion.getId()).get();
        // Disconnect from session so that the updates on updatedInstitucion are not directly saved in db
        em.detach(updatedInstitucion);
        updatedInstitucion
            .nombre(UPDATED_NOMBRE)
            .web(UPDATED_WEB)
            .fechaRegistro(UPDATED_FECHA_REGISTRO);

        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInstitucion)))
            .andExpect(status().isOk());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate);
        Institucion testInstitucion = institucionList.get(institucionList.size() - 1);
        assertThat(testInstitucion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testInstitucion.getWeb()).isEqualTo(UPDATED_WEB);
        assertThat(testInstitucion.getFechaRegistro()).isEqualTo(UPDATED_FECHA_REGISTRO);
    }

    @Test
    @Transactional
    public void updateNonExistingInstitucion() throws Exception {
        int databaseSizeBeforeUpdate = institucionRepository.findAll().size();

        // Create the Institucion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstitucionMockMvc.perform(put("/api/institucions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(institucion)))
            .andExpect(status().isBadRequest());

        // Validate the Institucion in the database
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInstitucion() throws Exception {
        // Initialize the database
        institucionRepository.saveAndFlush(institucion);

        int databaseSizeBeforeDelete = institucionRepository.findAll().size();

        // Delete the institucion
        restInstitucionMockMvc.perform(delete("/api/institucions/{id}", institucion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Institucion> institucionList = institucionRepository.findAll();
        assertThat(institucionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
