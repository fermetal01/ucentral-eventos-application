package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.DelegadoInstitucional;
import co.edu.ucentral.eventos.repository.DelegadoInstitucionalRepository;

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
 * Integration tests for the {@link DelegadoInstitucionalResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DelegadoInstitucionalResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private DelegadoInstitucionalRepository delegadoInstitucionalRepository;

    @Mock
    private DelegadoInstitucionalRepository delegadoInstitucionalRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDelegadoInstitucionalMockMvc;

    private DelegadoInstitucional delegadoInstitucional;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DelegadoInstitucional createEntity(EntityManager em) {
        DelegadoInstitucional delegadoInstitucional = new DelegadoInstitucional()
            .codigo(DEFAULT_CODIGO);
        return delegadoInstitucional;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DelegadoInstitucional createUpdatedEntity(EntityManager em) {
        DelegadoInstitucional delegadoInstitucional = new DelegadoInstitucional()
            .codigo(UPDATED_CODIGO);
        return delegadoInstitucional;
    }

    @BeforeEach
    public void initTest() {
        delegadoInstitucional = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelegadoInstitucional() throws Exception {
        int databaseSizeBeforeCreate = delegadoInstitucionalRepository.findAll().size();

        // Create the DelegadoInstitucional
        restDelegadoInstitucionalMockMvc.perform(post("/api/delegado-institucionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delegadoInstitucional)))
            .andExpect(status().isCreated());

        // Validate the DelegadoInstitucional in the database
        List<DelegadoInstitucional> delegadoInstitucionalList = delegadoInstitucionalRepository.findAll();
        assertThat(delegadoInstitucionalList).hasSize(databaseSizeBeforeCreate + 1);
        DelegadoInstitucional testDelegadoInstitucional = delegadoInstitucionalList.get(delegadoInstitucionalList.size() - 1);
        assertThat(testDelegadoInstitucional.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createDelegadoInstitucionalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = delegadoInstitucionalRepository.findAll().size();

        // Create the DelegadoInstitucional with an existing ID
        delegadoInstitucional.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDelegadoInstitucionalMockMvc.perform(post("/api/delegado-institucionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delegadoInstitucional)))
            .andExpect(status().isBadRequest());

        // Validate the DelegadoInstitucional in the database
        List<DelegadoInstitucional> delegadoInstitucionalList = delegadoInstitucionalRepository.findAll();
        assertThat(delegadoInstitucionalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDelegadoInstitucionals() throws Exception {
        // Initialize the database
        delegadoInstitucionalRepository.saveAndFlush(delegadoInstitucional);

        // Get all the delegadoInstitucionalList
        restDelegadoInstitucionalMockMvc.perform(get("/api/delegado-institucionals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delegadoInstitucional.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDelegadoInstitucionalsWithEagerRelationshipsIsEnabled() throws Exception {
        DelegadoInstitucionalResource delegadoInstitucionalResource = new DelegadoInstitucionalResource(delegadoInstitucionalRepositoryMock);
        when(delegadoInstitucionalRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDelegadoInstitucionalMockMvc.perform(get("/api/delegado-institucionals?eagerload=true"))
            .andExpect(status().isOk());

        verify(delegadoInstitucionalRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDelegadoInstitucionalsWithEagerRelationshipsIsNotEnabled() throws Exception {
        DelegadoInstitucionalResource delegadoInstitucionalResource = new DelegadoInstitucionalResource(delegadoInstitucionalRepositoryMock);
        when(delegadoInstitucionalRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDelegadoInstitucionalMockMvc.perform(get("/api/delegado-institucionals?eagerload=true"))
            .andExpect(status().isOk());

        verify(delegadoInstitucionalRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDelegadoInstitucional() throws Exception {
        // Initialize the database
        delegadoInstitucionalRepository.saveAndFlush(delegadoInstitucional);

        // Get the delegadoInstitucional
        restDelegadoInstitucionalMockMvc.perform(get("/api/delegado-institucionals/{id}", delegadoInstitucional.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(delegadoInstitucional.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    public void getNonExistingDelegadoInstitucional() throws Exception {
        // Get the delegadoInstitucional
        restDelegadoInstitucionalMockMvc.perform(get("/api/delegado-institucionals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelegadoInstitucional() throws Exception {
        // Initialize the database
        delegadoInstitucionalRepository.saveAndFlush(delegadoInstitucional);

        int databaseSizeBeforeUpdate = delegadoInstitucionalRepository.findAll().size();

        // Update the delegadoInstitucional
        DelegadoInstitucional updatedDelegadoInstitucional = delegadoInstitucionalRepository.findById(delegadoInstitucional.getId()).get();
        // Disconnect from session so that the updates on updatedDelegadoInstitucional are not directly saved in db
        em.detach(updatedDelegadoInstitucional);
        updatedDelegadoInstitucional
            .codigo(UPDATED_CODIGO);

        restDelegadoInstitucionalMockMvc.perform(put("/api/delegado-institucionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelegadoInstitucional)))
            .andExpect(status().isOk());

        // Validate the DelegadoInstitucional in the database
        List<DelegadoInstitucional> delegadoInstitucionalList = delegadoInstitucionalRepository.findAll();
        assertThat(delegadoInstitucionalList).hasSize(databaseSizeBeforeUpdate);
        DelegadoInstitucional testDelegadoInstitucional = delegadoInstitucionalList.get(delegadoInstitucionalList.size() - 1);
        assertThat(testDelegadoInstitucional.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingDelegadoInstitucional() throws Exception {
        int databaseSizeBeforeUpdate = delegadoInstitucionalRepository.findAll().size();

        // Create the DelegadoInstitucional

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDelegadoInstitucionalMockMvc.perform(put("/api/delegado-institucionals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delegadoInstitucional)))
            .andExpect(status().isBadRequest());

        // Validate the DelegadoInstitucional in the database
        List<DelegadoInstitucional> delegadoInstitucionalList = delegadoInstitucionalRepository.findAll();
        assertThat(delegadoInstitucionalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDelegadoInstitucional() throws Exception {
        // Initialize the database
        delegadoInstitucionalRepository.saveAndFlush(delegadoInstitucional);

        int databaseSizeBeforeDelete = delegadoInstitucionalRepository.findAll().size();

        // Delete the delegadoInstitucional
        restDelegadoInstitucionalMockMvc.perform(delete("/api/delegado-institucionals/{id}", delegadoInstitucional.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DelegadoInstitucional> delegadoInstitucionalList = delegadoInstitucionalRepository.findAll();
        assertThat(delegadoInstitucionalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
