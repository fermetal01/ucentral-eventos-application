package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.Programa;
import co.edu.ucentral.eventos.repository.ProgramaRepository;

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
 * Integration tests for the {@link ProgramaResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProgramaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ProgramaRepository programaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgramaMockMvc;

    private Programa programa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programa createEntity(EntityManager em) {
        Programa programa = new Programa()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return programa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programa createUpdatedEntity(EntityManager em) {
        Programa programa = new Programa()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return programa;
    }

    @BeforeEach
    public void initTest() {
        programa = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrograma() throws Exception {
        int databaseSizeBeforeCreate = programaRepository.findAll().size();

        // Create the Programa
        restProgramaMockMvc.perform(post("/api/programas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programa)))
            .andExpect(status().isCreated());

        // Validate the Programa in the database
        List<Programa> programaList = programaRepository.findAll();
        assertThat(programaList).hasSize(databaseSizeBeforeCreate + 1);
        Programa testPrograma = programaList.get(programaList.size() - 1);
        assertThat(testPrograma.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPrograma.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createProgramaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programaRepository.findAll().size();

        // Create the Programa with an existing ID
        programa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramaMockMvc.perform(post("/api/programas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programa)))
            .andExpect(status().isBadRequest());

        // Validate the Programa in the database
        List<Programa> programaList = programaRepository.findAll();
        assertThat(programaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProgramas() throws Exception {
        // Initialize the database
        programaRepository.saveAndFlush(programa);

        // Get all the programaList
        restProgramaMockMvc.perform(get("/api/programas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getPrograma() throws Exception {
        // Initialize the database
        programaRepository.saveAndFlush(programa);

        // Get the programa
        restProgramaMockMvc.perform(get("/api/programas/{id}", programa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(programa.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingPrograma() throws Exception {
        // Get the programa
        restProgramaMockMvc.perform(get("/api/programas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrograma() throws Exception {
        // Initialize the database
        programaRepository.saveAndFlush(programa);

        int databaseSizeBeforeUpdate = programaRepository.findAll().size();

        // Update the programa
        Programa updatedPrograma = programaRepository.findById(programa.getId()).get();
        // Disconnect from session so that the updates on updatedPrograma are not directly saved in db
        em.detach(updatedPrograma);
        updatedPrograma
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restProgramaMockMvc.perform(put("/api/programas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrograma)))
            .andExpect(status().isOk());

        // Validate the Programa in the database
        List<Programa> programaList = programaRepository.findAll();
        assertThat(programaList).hasSize(databaseSizeBeforeUpdate);
        Programa testPrograma = programaList.get(programaList.size() - 1);
        assertThat(testPrograma.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPrograma.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingPrograma() throws Exception {
        int databaseSizeBeforeUpdate = programaRepository.findAll().size();

        // Create the Programa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramaMockMvc.perform(put("/api/programas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programa)))
            .andExpect(status().isBadRequest());

        // Validate the Programa in the database
        List<Programa> programaList = programaRepository.findAll();
        assertThat(programaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrograma() throws Exception {
        // Initialize the database
        programaRepository.saveAndFlush(programa);

        int databaseSizeBeforeDelete = programaRepository.findAll().size();

        // Delete the programa
        restProgramaMockMvc.perform(delete("/api/programas/{id}", programa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Programa> programaList = programaRepository.findAll();
        assertThat(programaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
