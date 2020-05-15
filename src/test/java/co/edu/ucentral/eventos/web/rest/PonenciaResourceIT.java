package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Ponencia;
import co.edu.ucentral.eventos.repository.PonenciaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static co.edu.ucentral.eventos.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PonenciaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PonenciaResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_INICIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_INICIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_FECHA_FIN = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_FIN = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PonenciaRepository ponenciaRepository;

    @Mock
    private PonenciaRepository ponenciaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPonenciaMockMvc;

    private Ponencia ponencia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ponencia createEntity(EntityManager em) {
        Ponencia ponencia = new Ponencia()
            .fechaInicio(DEFAULT_FECHA_INICIO)
            .fechaFin(DEFAULT_FECHA_FIN);
        return ponencia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ponencia createUpdatedEntity(EntityManager em) {
        Ponencia ponencia = new Ponencia()
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);
        return ponencia;
    }

    @BeforeEach
    public void initTest() {
        ponencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createPonencia() throws Exception {
        int databaseSizeBeforeCreate = ponenciaRepository.findAll().size();

        // Create the Ponencia
        restPonenciaMockMvc.perform(post("/api/ponencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ponencia)))
            .andExpect(status().isCreated());

        // Validate the Ponencia in the database
        List<Ponencia> ponenciaList = ponenciaRepository.findAll();
        assertThat(ponenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Ponencia testPonencia = ponenciaList.get(ponenciaList.size() - 1);
        assertThat(testPonencia.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
        assertThat(testPonencia.getFechaFin()).isEqualTo(DEFAULT_FECHA_FIN);
    }

    @Test
    @Transactional
    public void createPonenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ponenciaRepository.findAll().size();

        // Create the Ponencia with an existing ID
        ponencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPonenciaMockMvc.perform(post("/api/ponencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ponencia)))
            .andExpect(status().isBadRequest());

        // Validate the Ponencia in the database
        List<Ponencia> ponenciaList = ponenciaRepository.findAll();
        assertThat(ponenciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPonencias() throws Exception {
        // Initialize the database
        ponenciaRepository.saveAndFlush(ponencia);

        // Get all the ponenciaList
        restPonenciaMockMvc.perform(get("/api/ponencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ponencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(sameInstant(DEFAULT_FECHA_INICIO))))
            .andExpect(jsonPath("$.[*].fechaFin").value(hasItem(sameInstant(DEFAULT_FECHA_FIN))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPonenciasWithEagerRelationshipsIsEnabled() throws Exception {
        PonenciaResource ponenciaResource = new PonenciaResource(ponenciaRepositoryMock);
        when(ponenciaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPonenciaMockMvc.perform(get("/api/ponencias?eagerload=true"))
            .andExpect(status().isOk());

        verify(ponenciaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPonenciasWithEagerRelationshipsIsNotEnabled() throws Exception {
        PonenciaResource ponenciaResource = new PonenciaResource(ponenciaRepositoryMock);
        when(ponenciaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPonenciaMockMvc.perform(get("/api/ponencias?eagerload=true"))
            .andExpect(status().isOk());

        verify(ponenciaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPonencia() throws Exception {
        // Initialize the database
        ponenciaRepository.saveAndFlush(ponencia);

        // Get the ponencia
        restPonenciaMockMvc.perform(get("/api/ponencias/{id}", ponencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ponencia.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(sameInstant(DEFAULT_FECHA_INICIO)))
            .andExpect(jsonPath("$.fechaFin").value(sameInstant(DEFAULT_FECHA_FIN)));
    }

    @Test
    @Transactional
    public void getNonExistingPonencia() throws Exception {
        // Get the ponencia
        restPonenciaMockMvc.perform(get("/api/ponencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePonencia() throws Exception {
        // Initialize the database
        ponenciaRepository.saveAndFlush(ponencia);

        int databaseSizeBeforeUpdate = ponenciaRepository.findAll().size();

        // Update the ponencia
        Ponencia updatedPonencia = ponenciaRepository.findById(ponencia.getId()).get();
        // Disconnect from session so that the updates on updatedPonencia are not directly saved in db
        em.detach(updatedPonencia);
        updatedPonencia
            .fechaInicio(UPDATED_FECHA_INICIO)
            .fechaFin(UPDATED_FECHA_FIN);

        restPonenciaMockMvc.perform(put("/api/ponencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPonencia)))
            .andExpect(status().isOk());

        // Validate the Ponencia in the database
        List<Ponencia> ponenciaList = ponenciaRepository.findAll();
        assertThat(ponenciaList).hasSize(databaseSizeBeforeUpdate);
        Ponencia testPonencia = ponenciaList.get(ponenciaList.size() - 1);
        assertThat(testPonencia.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
        assertThat(testPonencia.getFechaFin()).isEqualTo(UPDATED_FECHA_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingPonencia() throws Exception {
        int databaseSizeBeforeUpdate = ponenciaRepository.findAll().size();

        // Create the Ponencia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPonenciaMockMvc.perform(put("/api/ponencias")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ponencia)))
            .andExpect(status().isBadRequest());

        // Validate the Ponencia in the database
        List<Ponencia> ponenciaList = ponenciaRepository.findAll();
        assertThat(ponenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePonencia() throws Exception {
        // Initialize the database
        ponenciaRepository.saveAndFlush(ponencia);

        int databaseSizeBeforeDelete = ponenciaRepository.findAll().size();

        // Delete the ponencia
        restPonenciaMockMvc.perform(delete("/api/ponencias/{id}", ponencia.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ponencia> ponenciaList = ponenciaRepository.findAll();
        assertThat(ponenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
