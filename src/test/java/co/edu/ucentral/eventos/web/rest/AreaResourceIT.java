package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Area;
import co.edu.ucentral.eventos.repository.AreaRepository;

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
 * Integration tests for the {@link AreaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AreaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACIDAD = 1;
    private static final Integer UPDATED_CAPACIDAD = 2;

    private static final String DEFAULT_UBICACION = "AAAAAAAAAA";
    private static final String UPDATED_UBICACION = "BBBBBBBBBB";

    @Autowired
    private AreaRepository areaRepository;

    @Mock
    private AreaRepository areaRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAreaMockMvc;

    private Area area;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Area createEntity(EntityManager em) {
        Area area = new Area()
            .nombre(DEFAULT_NOMBRE)
            .capacidad(DEFAULT_CAPACIDAD)
            .ubicacion(DEFAULT_UBICACION);
        return area;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Area createUpdatedEntity(EntityManager em) {
        Area area = new Area()
            .nombre(UPDATED_NOMBRE)
            .capacidad(UPDATED_CAPACIDAD)
            .ubicacion(UPDATED_UBICACION);
        return area;
    }

    @BeforeEach
    public void initTest() {
        area = createEntity(em);
    }

    @Test
    @Transactional
    public void createArea() throws Exception {
        int databaseSizeBeforeCreate = areaRepository.findAll().size();

        // Create the Area
        restAreaMockMvc.perform(post("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(area)))
            .andExpect(status().isCreated());

        // Validate the Area in the database
        List<Area> areaList = areaRepository.findAll();
        assertThat(areaList).hasSize(databaseSizeBeforeCreate + 1);
        Area testArea = areaList.get(areaList.size() - 1);
        assertThat(testArea.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testArea.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
        assertThat(testArea.getUbicacion()).isEqualTo(DEFAULT_UBICACION);
    }

    @Test
    @Transactional
    public void createAreaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areaRepository.findAll().size();

        // Create the Area with an existing ID
        area.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaMockMvc.perform(post("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(area)))
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        List<Area> areaList = areaRepository.findAll();
        assertThat(areaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAreas() throws Exception {
        // Initialize the database
        areaRepository.saveAndFlush(area);

        // Get all the areaList
        restAreaMockMvc.perform(get("/api/areas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(area.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].ubicacion").value(hasItem(DEFAULT_UBICACION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAreasWithEagerRelationshipsIsEnabled() throws Exception {
        AreaResource areaResource = new AreaResource(areaRepositoryMock);
        when(areaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAreaMockMvc.perform(get("/api/areas?eagerload=true"))
            .andExpect(status().isOk());

        verify(areaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAreasWithEagerRelationshipsIsNotEnabled() throws Exception {
        AreaResource areaResource = new AreaResource(areaRepositoryMock);
        when(areaRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAreaMockMvc.perform(get("/api/areas?eagerload=true"))
            .andExpect(status().isOk());

        verify(areaRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getArea() throws Exception {
        // Initialize the database
        areaRepository.saveAndFlush(area);

        // Get the area
        restAreaMockMvc.perform(get("/api/areas/{id}", area.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(area.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD))
            .andExpect(jsonPath("$.ubicacion").value(DEFAULT_UBICACION));
    }

    @Test
    @Transactional
    public void getNonExistingArea() throws Exception {
        // Get the area
        restAreaMockMvc.perform(get("/api/areas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArea() throws Exception {
        // Initialize the database
        areaRepository.saveAndFlush(area);

        int databaseSizeBeforeUpdate = areaRepository.findAll().size();

        // Update the area
        Area updatedArea = areaRepository.findById(area.getId()).get();
        // Disconnect from session so that the updates on updatedArea are not directly saved in db
        em.detach(updatedArea);
        updatedArea
            .nombre(UPDATED_NOMBRE)
            .capacidad(UPDATED_CAPACIDAD)
            .ubicacion(UPDATED_UBICACION);

        restAreaMockMvc.perform(put("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedArea)))
            .andExpect(status().isOk());

        // Validate the Area in the database
        List<Area> areaList = areaRepository.findAll();
        assertThat(areaList).hasSize(databaseSizeBeforeUpdate);
        Area testArea = areaList.get(areaList.size() - 1);
        assertThat(testArea.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testArea.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testArea.getUbicacion()).isEqualTo(UPDATED_UBICACION);
    }

    @Test
    @Transactional
    public void updateNonExistingArea() throws Exception {
        int databaseSizeBeforeUpdate = areaRepository.findAll().size();

        // Create the Area

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaMockMvc.perform(put("/api/areas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(area)))
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        List<Area> areaList = areaRepository.findAll();
        assertThat(areaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArea() throws Exception {
        // Initialize the database
        areaRepository.saveAndFlush(area);

        int databaseSizeBeforeDelete = areaRepository.findAll().size();

        // Delete the area
        restAreaMockMvc.perform(delete("/api/areas/{id}", area.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Area> areaList = areaRepository.findAll();
        assertThat(areaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
