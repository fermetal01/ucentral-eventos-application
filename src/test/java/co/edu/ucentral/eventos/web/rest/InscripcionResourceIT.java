package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Inscripcion;
import co.edu.ucentral.eventos.repository.InscripcionRepository;

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
 * Integration tests for the {@link InscripcionResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class InscripcionResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_REGISTRO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_REGISTRO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_APROBADO_INSTITUCION = false;
    private static final Boolean UPDATED_APROBADO_INSTITUCION = true;

    private static final Boolean DEFAULT_APROBADO_EVENTO = false;
    private static final Boolean UPDATED_APROBADO_EVENTO = true;

    @Autowired
    private InscripcionRepository inscripcionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInscripcionMockMvc;

    private Inscripcion inscripcion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inscripcion createEntity(EntityManager em) {
        Inscripcion inscripcion = new Inscripcion()
            .fechaRegistro(DEFAULT_FECHA_REGISTRO)
            .aprobadoInstitucion(DEFAULT_APROBADO_INSTITUCION)
            .aprobadoEvento(DEFAULT_APROBADO_EVENTO);
        return inscripcion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inscripcion createUpdatedEntity(EntityManager em) {
        Inscripcion inscripcion = new Inscripcion()
            .fechaRegistro(UPDATED_FECHA_REGISTRO)
            .aprobadoInstitucion(UPDATED_APROBADO_INSTITUCION)
            .aprobadoEvento(UPDATED_APROBADO_EVENTO);
        return inscripcion;
    }

    @BeforeEach
    public void initTest() {
        inscripcion = createEntity(em);
    }

    @Test
    @Transactional
    public void createInscripcion() throws Exception {
        int databaseSizeBeforeCreate = inscripcionRepository.findAll().size();

        // Create the Inscripcion
        restInscripcionMockMvc.perform(post("/api/inscripcions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscripcion)))
            .andExpect(status().isCreated());

        // Validate the Inscripcion in the database
        List<Inscripcion> inscripcionList = inscripcionRepository.findAll();
        assertThat(inscripcionList).hasSize(databaseSizeBeforeCreate + 1);
        Inscripcion testInscripcion = inscripcionList.get(inscripcionList.size() - 1);
        assertThat(testInscripcion.getFechaRegistro()).isEqualTo(DEFAULT_FECHA_REGISTRO);
        assertThat(testInscripcion.isAprobadoInstitucion()).isEqualTo(DEFAULT_APROBADO_INSTITUCION);
        assertThat(testInscripcion.isAprobadoEvento()).isEqualTo(DEFAULT_APROBADO_EVENTO);
    }

    @Test
    @Transactional
    public void createInscripcionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inscripcionRepository.findAll().size();

        // Create the Inscripcion with an existing ID
        inscripcion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscripcionMockMvc.perform(post("/api/inscripcions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the Inscripcion in the database
        List<Inscripcion> inscripcionList = inscripcionRepository.findAll();
        assertThat(inscripcionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInscripcions() throws Exception {
        // Initialize the database
        inscripcionRepository.saveAndFlush(inscripcion);

        // Get all the inscripcionList
        restInscripcionMockMvc.perform(get("/api/inscripcions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscripcion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaRegistro").value(hasItem(sameInstant(DEFAULT_FECHA_REGISTRO))))
            .andExpect(jsonPath("$.[*].aprobadoInstitucion").value(hasItem(DEFAULT_APROBADO_INSTITUCION.booleanValue())))
            .andExpect(jsonPath("$.[*].aprobadoEvento").value(hasItem(DEFAULT_APROBADO_EVENTO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getInscripcion() throws Exception {
        // Initialize the database
        inscripcionRepository.saveAndFlush(inscripcion);

        // Get the inscripcion
        restInscripcionMockMvc.perform(get("/api/inscripcions/{id}", inscripcion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inscripcion.getId().intValue()))
            .andExpect(jsonPath("$.fechaRegistro").value(sameInstant(DEFAULT_FECHA_REGISTRO)))
            .andExpect(jsonPath("$.aprobadoInstitucion").value(DEFAULT_APROBADO_INSTITUCION.booleanValue()))
            .andExpect(jsonPath("$.aprobadoEvento").value(DEFAULT_APROBADO_EVENTO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingInscripcion() throws Exception {
        // Get the inscripcion
        restInscripcionMockMvc.perform(get("/api/inscripcions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInscripcion() throws Exception {
        // Initialize the database
        inscripcionRepository.saveAndFlush(inscripcion);

        int databaseSizeBeforeUpdate = inscripcionRepository.findAll().size();

        // Update the inscripcion
        Inscripcion updatedInscripcion = inscripcionRepository.findById(inscripcion.getId()).get();
        // Disconnect from session so that the updates on updatedInscripcion are not directly saved in db
        em.detach(updatedInscripcion);
        updatedInscripcion
            .fechaRegistro(UPDATED_FECHA_REGISTRO)
            .aprobadoInstitucion(UPDATED_APROBADO_INSTITUCION)
            .aprobadoEvento(UPDATED_APROBADO_EVENTO);

        restInscripcionMockMvc.perform(put("/api/inscripcions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInscripcion)))
            .andExpect(status().isOk());

        // Validate the Inscripcion in the database
        List<Inscripcion> inscripcionList = inscripcionRepository.findAll();
        assertThat(inscripcionList).hasSize(databaseSizeBeforeUpdate);
        Inscripcion testInscripcion = inscripcionList.get(inscripcionList.size() - 1);
        assertThat(testInscripcion.getFechaRegistro()).isEqualTo(UPDATED_FECHA_REGISTRO);
        assertThat(testInscripcion.isAprobadoInstitucion()).isEqualTo(UPDATED_APROBADO_INSTITUCION);
        assertThat(testInscripcion.isAprobadoEvento()).isEqualTo(UPDATED_APROBADO_EVENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingInscripcion() throws Exception {
        int databaseSizeBeforeUpdate = inscripcionRepository.findAll().size();

        // Create the Inscripcion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInscripcionMockMvc.perform(put("/api/inscripcions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscripcion)))
            .andExpect(status().isBadRequest());

        // Validate the Inscripcion in the database
        List<Inscripcion> inscripcionList = inscripcionRepository.findAll();
        assertThat(inscripcionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInscripcion() throws Exception {
        // Initialize the database
        inscripcionRepository.saveAndFlush(inscripcion);

        int databaseSizeBeforeDelete = inscripcionRepository.findAll().size();

        // Delete the inscripcion
        restInscripcionMockMvc.perform(delete("/api/inscripcions/{id}", inscripcion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Inscripcion> inscripcionList = inscripcionRepository.findAll();
        assertThat(inscripcionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
