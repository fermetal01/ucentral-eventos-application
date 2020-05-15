package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Estadistica;
import co.edu.ucentral.eventos.repository.EstadisticaRepository;

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
 * Integration tests for the {@link EstadisticaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstadisticaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_LLAVE = "AAAAAAAAAA";
    private static final String UPDATED_LLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_VALOR = "AAAAAAAAAA";
    private static final String UPDATED_VALOR = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private EstadisticaRepository estadisticaRepository;

    @Mock
    private EstadisticaRepository estadisticaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadisticaMockMvc;

    private Estadistica estadistica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estadistica createEntity(EntityManager em) {
        Estadistica estadistica = new Estadistica()
            .nombre(DEFAULT_NOMBRE)
            .llave(DEFAULT_LLAVE)
            .valor(DEFAULT_VALOR)
            .descripcion(DEFAULT_DESCRIPCION);
        return estadistica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estadistica createUpdatedEntity(EntityManager em) {
        Estadistica estadistica = new Estadistica()
            .nombre(UPDATED_NOMBRE)
            .llave(UPDATED_LLAVE)
            .valor(UPDATED_VALOR)
            .descripcion(UPDATED_DESCRIPCION);
        return estadistica;
    }

    @BeforeEach
    public void initTest() {
        estadistica = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadistica() throws Exception {
        int databaseSizeBeforeCreate = estadisticaRepository.findAll().size();

        // Create the Estadistica
        restEstadisticaMockMvc.perform(post("/api/estadisticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadistica)))
            .andExpect(status().isCreated());

        // Validate the Estadistica in the database
        List<Estadistica> estadisticaList = estadisticaRepository.findAll();
        assertThat(estadisticaList).hasSize(databaseSizeBeforeCreate + 1);
        Estadistica testEstadistica = estadisticaList.get(estadisticaList.size() - 1);
        assertThat(testEstadistica.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEstadistica.getLlave()).isEqualTo(DEFAULT_LLAVE);
        assertThat(testEstadistica.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testEstadistica.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createEstadisticaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadisticaRepository.findAll().size();

        // Create the Estadistica with an existing ID
        estadistica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadisticaMockMvc.perform(post("/api/estadisticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadistica)))
            .andExpect(status().isBadRequest());

        // Validate the Estadistica in the database
        List<Estadistica> estadisticaList = estadisticaRepository.findAll();
        assertThat(estadisticaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstadisticas() throws Exception {
        // Initialize the database
        estadisticaRepository.saveAndFlush(estadistica);

        // Get all the estadisticaList
        restEstadisticaMockMvc.perform(get("/api/estadisticas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadistica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].llave").value(hasItem(DEFAULT_LLAVE)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEstadisticasWithEagerRelationshipsIsEnabled() throws Exception {
        EstadisticaResource estadisticaResource = new EstadisticaResource(estadisticaRepositoryMock);
        when(estadisticaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEstadisticaMockMvc.perform(get("/api/estadisticas?eagerload=true"))
            .andExpect(status().isOk());

        verify(estadisticaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEstadisticasWithEagerRelationshipsIsNotEnabled() throws Exception {
        EstadisticaResource estadisticaResource = new EstadisticaResource(estadisticaRepositoryMock);
        when(estadisticaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restEstadisticaMockMvc.perform(get("/api/estadisticas?eagerload=true"))
            .andExpect(status().isOk());

        verify(estadisticaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEstadistica() throws Exception {
        // Initialize the database
        estadisticaRepository.saveAndFlush(estadistica);

        // Get the estadistica
        restEstadisticaMockMvc.perform(get("/api/estadisticas/{id}", estadistica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadistica.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.llave").value(DEFAULT_LLAVE))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingEstadistica() throws Exception {
        // Get the estadistica
        restEstadisticaMockMvc.perform(get("/api/estadisticas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadistica() throws Exception {
        // Initialize the database
        estadisticaRepository.saveAndFlush(estadistica);

        int databaseSizeBeforeUpdate = estadisticaRepository.findAll().size();

        // Update the estadistica
        Estadistica updatedEstadistica = estadisticaRepository.findById(estadistica.getId()).get();
        // Disconnect from session so that the updates on updatedEstadistica are not directly saved in db
        em.detach(updatedEstadistica);
        updatedEstadistica
            .nombre(UPDATED_NOMBRE)
            .llave(UPDATED_LLAVE)
            .valor(UPDATED_VALOR)
            .descripcion(UPDATED_DESCRIPCION);

        restEstadisticaMockMvc.perform(put("/api/estadisticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadistica)))
            .andExpect(status().isOk());

        // Validate the Estadistica in the database
        List<Estadistica> estadisticaList = estadisticaRepository.findAll();
        assertThat(estadisticaList).hasSize(databaseSizeBeforeUpdate);
        Estadistica testEstadistica = estadisticaList.get(estadisticaList.size() - 1);
        assertThat(testEstadistica.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEstadistica.getLlave()).isEqualTo(UPDATED_LLAVE);
        assertThat(testEstadistica.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testEstadistica.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadistica() throws Exception {
        int databaseSizeBeforeUpdate = estadisticaRepository.findAll().size();

        // Create the Estadistica

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadisticaMockMvc.perform(put("/api/estadisticas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estadistica)))
            .andExpect(status().isBadRequest());

        // Validate the Estadistica in the database
        List<Estadistica> estadisticaList = estadisticaRepository.findAll();
        assertThat(estadisticaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadistica() throws Exception {
        // Initialize the database
        estadisticaRepository.saveAndFlush(estadistica);

        int databaseSizeBeforeDelete = estadisticaRepository.findAll().size();

        // Delete the estadistica
        restEstadisticaMockMvc.perform(delete("/api/estadisticas/{id}", estadistica.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estadistica> estadisticaList = estadisticaRepository.findAll();
        assertThat(estadisticaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
