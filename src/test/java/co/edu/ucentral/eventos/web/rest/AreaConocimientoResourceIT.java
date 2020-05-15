package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.AreaConocimiento;
import co.edu.ucentral.eventos.repository.AreaConocimientoRepository;

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
 * Integration tests for the {@link AreaConocimientoResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AreaConocimientoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private AreaConocimientoRepository areaConocimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAreaConocimientoMockMvc;

    private AreaConocimiento areaConocimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaConocimiento createEntity(EntityManager em) {
        AreaConocimiento areaConocimiento = new AreaConocimiento()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return areaConocimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaConocimiento createUpdatedEntity(EntityManager em) {
        AreaConocimiento areaConocimiento = new AreaConocimiento()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return areaConocimiento;
    }

    @BeforeEach
    public void initTest() {
        areaConocimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAreaConocimiento() throws Exception {
        int databaseSizeBeforeCreate = areaConocimientoRepository.findAll().size();

        // Create the AreaConocimiento
        restAreaConocimientoMockMvc.perform(post("/api/area-conocimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaConocimiento)))
            .andExpect(status().isCreated());

        // Validate the AreaConocimiento in the database
        List<AreaConocimiento> areaConocimientoList = areaConocimientoRepository.findAll();
        assertThat(areaConocimientoList).hasSize(databaseSizeBeforeCreate + 1);
        AreaConocimiento testAreaConocimiento = areaConocimientoList.get(areaConocimientoList.size() - 1);
        assertThat(testAreaConocimiento.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAreaConocimiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createAreaConocimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = areaConocimientoRepository.findAll().size();

        // Create the AreaConocimiento with an existing ID
        areaConocimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaConocimientoMockMvc.perform(post("/api/area-conocimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaConocimiento)))
            .andExpect(status().isBadRequest());

        // Validate the AreaConocimiento in the database
        List<AreaConocimiento> areaConocimientoList = areaConocimientoRepository.findAll();
        assertThat(areaConocimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAreaConocimientos() throws Exception {
        // Initialize the database
        areaConocimientoRepository.saveAndFlush(areaConocimiento);

        // Get all the areaConocimientoList
        restAreaConocimientoMockMvc.perform(get("/api/area-conocimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areaConocimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getAreaConocimiento() throws Exception {
        // Initialize the database
        areaConocimientoRepository.saveAndFlush(areaConocimiento);

        // Get the areaConocimiento
        restAreaConocimientoMockMvc.perform(get("/api/area-conocimientos/{id}", areaConocimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(areaConocimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingAreaConocimiento() throws Exception {
        // Get the areaConocimiento
        restAreaConocimientoMockMvc.perform(get("/api/area-conocimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAreaConocimiento() throws Exception {
        // Initialize the database
        areaConocimientoRepository.saveAndFlush(areaConocimiento);

        int databaseSizeBeforeUpdate = areaConocimientoRepository.findAll().size();

        // Update the areaConocimiento
        AreaConocimiento updatedAreaConocimiento = areaConocimientoRepository.findById(areaConocimiento.getId()).get();
        // Disconnect from session so that the updates on updatedAreaConocimiento are not directly saved in db
        em.detach(updatedAreaConocimiento);
        updatedAreaConocimiento
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restAreaConocimientoMockMvc.perform(put("/api/area-conocimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAreaConocimiento)))
            .andExpect(status().isOk());

        // Validate the AreaConocimiento in the database
        List<AreaConocimiento> areaConocimientoList = areaConocimientoRepository.findAll();
        assertThat(areaConocimientoList).hasSize(databaseSizeBeforeUpdate);
        AreaConocimiento testAreaConocimiento = areaConocimientoList.get(areaConocimientoList.size() - 1);
        assertThat(testAreaConocimiento.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAreaConocimiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingAreaConocimiento() throws Exception {
        int databaseSizeBeforeUpdate = areaConocimientoRepository.findAll().size();

        // Create the AreaConocimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaConocimientoMockMvc.perform(put("/api/area-conocimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(areaConocimiento)))
            .andExpect(status().isBadRequest());

        // Validate the AreaConocimiento in the database
        List<AreaConocimiento> areaConocimientoList = areaConocimientoRepository.findAll();
        assertThat(areaConocimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAreaConocimiento() throws Exception {
        // Initialize the database
        areaConocimientoRepository.saveAndFlush(areaConocimiento);

        int databaseSizeBeforeDelete = areaConocimientoRepository.findAll().size();

        // Delete the areaConocimiento
        restAreaConocimientoMockMvc.perform(delete("/api/area-conocimientos/{id}", areaConocimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AreaConocimiento> areaConocimientoList = areaConocimientoRepository.findAll();
        assertThat(areaConocimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
