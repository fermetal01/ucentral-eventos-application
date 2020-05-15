package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Regla;
import co.edu.ucentral.eventos.repository.ReglaRepository;

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
 * Integration tests for the {@link ReglaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReglaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_LLAVE = "AAAAAAAAAA";
    private static final String UPDATED_LLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    private static final String DEFAULT_AUXILIAR = "AAAAAAAAAA";
    private static final String UPDATED_AUXILIAR = "BBBBBBBBBB";

    @Autowired
    private ReglaRepository reglaRepository;

    @Mock
    private ReglaRepository reglaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReglaMockMvc;

    private Regla regla;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regla createEntity(EntityManager em) {
        Regla regla = new Regla()
            .nombre(DEFAULT_NOMBRE)
            .llave(DEFAULT_LLAVE)
            .valor(DEFAULT_VALOR)
            .auxiliar(DEFAULT_AUXILIAR);
        return regla;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Regla createUpdatedEntity(EntityManager em) {
        Regla regla = new Regla()
            .nombre(UPDATED_NOMBRE)
            .llave(UPDATED_LLAVE)
            .valor(UPDATED_VALOR)
            .auxiliar(UPDATED_AUXILIAR);
        return regla;
    }

    @BeforeEach
    public void initTest() {
        regla = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegla() throws Exception {
        int databaseSizeBeforeCreate = reglaRepository.findAll().size();

        // Create the Regla
        restReglaMockMvc.perform(post("/api/reglas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regla)))
            .andExpect(status().isCreated());

        // Validate the Regla in the database
        List<Regla> reglaList = reglaRepository.findAll();
        assertThat(reglaList).hasSize(databaseSizeBeforeCreate + 1);
        Regla testRegla = reglaList.get(reglaList.size() - 1);
        assertThat(testRegla.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRegla.getLlave()).isEqualTo(DEFAULT_LLAVE);
        assertThat(testRegla.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testRegla.getAuxiliar()).isEqualTo(DEFAULT_AUXILIAR);
    }

    @Test
    @Transactional
    public void createReglaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reglaRepository.findAll().size();

        // Create the Regla with an existing ID
        regla.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReglaMockMvc.perform(post("/api/reglas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regla)))
            .andExpect(status().isBadRequest());

        // Validate the Regla in the database
        List<Regla> reglaList = reglaRepository.findAll();
        assertThat(reglaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReglas() throws Exception {
        // Initialize the database
        reglaRepository.saveAndFlush(regla);

        // Get all the reglaList
        restReglaMockMvc.perform(get("/api/reglas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regla.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].llave").value(hasItem(DEFAULT_LLAVE)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].auxiliar").value(hasItem(DEFAULT_AUXILIAR)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllReglasWithEagerRelationshipsIsEnabled() throws Exception {
        ReglaResource reglaResource = new ReglaResource(reglaRepositoryMock);
        when(reglaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restReglaMockMvc.perform(get("/api/reglas?eagerload=true"))
            .andExpect(status().isOk());

        verify(reglaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllReglasWithEagerRelationshipsIsNotEnabled() throws Exception {
        ReglaResource reglaResource = new ReglaResource(reglaRepositoryMock);
        when(reglaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restReglaMockMvc.perform(get("/api/reglas?eagerload=true"))
            .andExpect(status().isOk());

        verify(reglaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getRegla() throws Exception {
        // Initialize the database
        reglaRepository.saveAndFlush(regla);

        // Get the regla
        restReglaMockMvc.perform(get("/api/reglas/{id}", regla.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(regla.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.llave").value(DEFAULT_LLAVE))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR))
            .andExpect(jsonPath("$.auxiliar").value(DEFAULT_AUXILIAR));
    }

    @Test
    @Transactional
    public void getNonExistingRegla() throws Exception {
        // Get the regla
        restReglaMockMvc.perform(get("/api/reglas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegla() throws Exception {
        // Initialize the database
        reglaRepository.saveAndFlush(regla);

        int databaseSizeBeforeUpdate = reglaRepository.findAll().size();

        // Update the regla
        Regla updatedRegla = reglaRepository.findById(regla.getId()).get();
        // Disconnect from session so that the updates on updatedRegla are not directly saved in db
        em.detach(updatedRegla);
        updatedRegla
            .nombre(UPDATED_NOMBRE)
            .llave(UPDATED_LLAVE)
            .valor(UPDATED_VALOR)
            .auxiliar(UPDATED_AUXILIAR);

        restReglaMockMvc.perform(put("/api/reglas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegla)))
            .andExpect(status().isOk());

        // Validate the Regla in the database
        List<Regla> reglaList = reglaRepository.findAll();
        assertThat(reglaList).hasSize(databaseSizeBeforeUpdate);
        Regla testRegla = reglaList.get(reglaList.size() - 1);
        assertThat(testRegla.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRegla.getLlave()).isEqualTo(UPDATED_LLAVE);
        assertThat(testRegla.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testRegla.getAuxiliar()).isEqualTo(UPDATED_AUXILIAR);
    }

    @Test
    @Transactional
    public void updateNonExistingRegla() throws Exception {
        int databaseSizeBeforeUpdate = reglaRepository.findAll().size();

        // Create the Regla

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReglaMockMvc.perform(put("/api/reglas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(regla)))
            .andExpect(status().isBadRequest());

        // Validate the Regla in the database
        List<Regla> reglaList = reglaRepository.findAll();
        assertThat(reglaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRegla() throws Exception {
        // Initialize the database
        reglaRepository.saveAndFlush(regla);

        int databaseSizeBeforeDelete = reglaRepository.findAll().size();

        // Delete the regla
        restReglaMockMvc.perform(delete("/api/reglas/{id}", regla.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Regla> reglaList = reglaRepository.findAll();
        assertThat(reglaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
