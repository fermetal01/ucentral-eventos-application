package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Semillero;
import co.edu.ucentral.eventos.repository.SemilleroRepository;

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
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SemilleroResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SemilleroResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private SemilleroRepository semilleroRepository;

    @Mock
    private SemilleroRepository semilleroRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSemilleroMockMvc;

    private Semillero semillero;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semillero createEntity(EntityManager em) {
        Semillero semillero = new Semillero()
            .nombre(DEFAULT_NOMBRE);
        return semillero;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semillero createUpdatedEntity(EntityManager em) {
        Semillero semillero = new Semillero()
            .nombre(UPDATED_NOMBRE);
        return semillero;
    }

    @BeforeEach
    public void initTest() {
        semillero = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemillero() throws Exception {
        int databaseSizeBeforeCreate = semilleroRepository.findAll().size();

        // Create the Semillero
        restSemilleroMockMvc.perform(post("/api/semilleros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semillero)))
            .andExpect(status().isCreated());

        // Validate the Semillero in the database
        List<Semillero> semilleroList = semilleroRepository.findAll();
        assertThat(semilleroList).hasSize(databaseSizeBeforeCreate + 1);
        Semillero testSemillero = semilleroList.get(semilleroList.size() - 1);
        assertThat(testSemillero.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createSemilleroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = semilleroRepository.findAll().size();

        // Create the Semillero with an existing ID
        semillero.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSemilleroMockMvc.perform(post("/api/semilleros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semillero)))
            .andExpect(status().isBadRequest());

        // Validate the Semillero in the database
        List<Semillero> semilleroList = semilleroRepository.findAll();
        assertThat(semilleroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSemilleros() throws Exception {
        // Initialize the database
        semilleroRepository.saveAndFlush(semillero);

        // Get all the semilleroList
        restSemilleroMockMvc.perform(get("/api/semilleros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semillero.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSemillerosWithEagerRelationshipsIsEnabled() throws Exception {
        SemilleroResource semilleroResource = new SemilleroResource(semilleroRepositoryMock);
        when(semilleroRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSemilleroMockMvc.perform(get("/api/semilleros?eagerload=true"))
            .andExpect(status().isOk());

        verify(semilleroRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSemillerosWithEagerRelationshipsIsNotEnabled() throws Exception {
        SemilleroResource semilleroResource = new SemilleroResource(semilleroRepositoryMock);
        when(semilleroRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSemilleroMockMvc.perform(get("/api/semilleros?eagerload=true"))
            .andExpect(status().isOk());

        verify(semilleroRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSemillero() throws Exception {
        // Initialize the database
        semilleroRepository.saveAndFlush(semillero);

        // Get the semillero
        restSemilleroMockMvc.perform(get("/api/semilleros/{id}", semillero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(semillero.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingSemillero() throws Exception {
        // Get the semillero
        restSemilleroMockMvc.perform(get("/api/semilleros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemillero() throws Exception {
        // Initialize the database
        semilleroRepository.saveAndFlush(semillero);

        int databaseSizeBeforeUpdate = semilleroRepository.findAll().size();

        // Update the semillero
        Semillero updatedSemillero = semilleroRepository.findById(semillero.getId()).get();
        // Disconnect from session so that the updates on updatedSemillero are not directly saved in db
        em.detach(updatedSemillero);
        updatedSemillero
            .nombre(UPDATED_NOMBRE);

        restSemilleroMockMvc.perform(put("/api/semilleros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemillero)))
            .andExpect(status().isOk());

        // Validate the Semillero in the database
        List<Semillero> semilleroList = semilleroRepository.findAll();
        assertThat(semilleroList).hasSize(databaseSizeBeforeUpdate);
        Semillero testSemillero = semilleroList.get(semilleroList.size() - 1);
        assertThat(testSemillero.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingSemillero() throws Exception {
        int databaseSizeBeforeUpdate = semilleroRepository.findAll().size();

        // Create the Semillero

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSemilleroMockMvc.perform(put("/api/semilleros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semillero)))
            .andExpect(status().isBadRequest());

        // Validate the Semillero in the database
        List<Semillero> semilleroList = semilleroRepository.findAll();
        assertThat(semilleroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSemillero() throws Exception {
        // Initialize the database
        semilleroRepository.saveAndFlush(semillero);

        int databaseSizeBeforeDelete = semilleroRepository.findAll().size();

        // Delete the semillero
        restSemilleroMockMvc.perform(delete("/api/semilleros/{id}", semillero.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Semillero> semilleroList = semilleroRepository.findAll();
        assertThat(semilleroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
