package co.edu.ucentral.eventos.web.rest;

import co.edu.ucentral.eventos.UcentralEventosApplicationApp;
import co.edu.ucentral.eventos.domain.UsuarioUcentral;
import co.edu.ucentral.eventos.repository.UsuarioUcentralRepository;

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
 * Integration tests for the {@link UsuarioUcentralResource} REST controller.
 */
@SpringBootTest(classes = UcentralEventosApplicationApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UsuarioUcentralResourceIT {

    private static final String DEFAULT_EMAIL_UCENTRAL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_UCENTRAL = "BBBBBBBBBB";

    @Autowired
    private UsuarioUcentralRepository usuarioUcentralRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioUcentralMockMvc;

    private UsuarioUcentral usuarioUcentral;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioUcentral createEntity(EntityManager em) {
        UsuarioUcentral usuarioUcentral = new UsuarioUcentral()
            .emailUcentral(DEFAULT_EMAIL_UCENTRAL);
        return usuarioUcentral;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UsuarioUcentral createUpdatedEntity(EntityManager em) {
        UsuarioUcentral usuarioUcentral = new UsuarioUcentral()
            .emailUcentral(UPDATED_EMAIL_UCENTRAL);
        return usuarioUcentral;
    }

    @BeforeEach
    public void initTest() {
        usuarioUcentral = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsuarioUcentral() throws Exception {
        int databaseSizeBeforeCreate = usuarioUcentralRepository.findAll().size();

        // Create the UsuarioUcentral
        restUsuarioUcentralMockMvc.perform(post("/api/usuario-ucentrals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuarioUcentral)))
            .andExpect(status().isCreated());

        // Validate the UsuarioUcentral in the database
        List<UsuarioUcentral> usuarioUcentralList = usuarioUcentralRepository.findAll();
        assertThat(usuarioUcentralList).hasSize(databaseSizeBeforeCreate + 1);
        UsuarioUcentral testUsuarioUcentral = usuarioUcentralList.get(usuarioUcentralList.size() - 1);
        assertThat(testUsuarioUcentral.getEmailUcentral()).isEqualTo(DEFAULT_EMAIL_UCENTRAL);
    }

    @Test
    @Transactional
    public void createUsuarioUcentralWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usuarioUcentralRepository.findAll().size();

        // Create the UsuarioUcentral with an existing ID
        usuarioUcentral.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioUcentralMockMvc.perform(post("/api/usuario-ucentrals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuarioUcentral)))
            .andExpect(status().isBadRequest());

        // Validate the UsuarioUcentral in the database
        List<UsuarioUcentral> usuarioUcentralList = usuarioUcentralRepository.findAll();
        assertThat(usuarioUcentralList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUsuarioUcentrals() throws Exception {
        // Initialize the database
        usuarioUcentralRepository.saveAndFlush(usuarioUcentral);

        // Get all the usuarioUcentralList
        restUsuarioUcentralMockMvc.perform(get("/api/usuario-ucentrals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuarioUcentral.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailUcentral").value(hasItem(DEFAULT_EMAIL_UCENTRAL)));
    }
    
    @Test
    @Transactional
    public void getUsuarioUcentral() throws Exception {
        // Initialize the database
        usuarioUcentralRepository.saveAndFlush(usuarioUcentral);

        // Get the usuarioUcentral
        restUsuarioUcentralMockMvc.perform(get("/api/usuario-ucentrals/{id}", usuarioUcentral.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuarioUcentral.getId().intValue()))
            .andExpect(jsonPath("$.emailUcentral").value(DEFAULT_EMAIL_UCENTRAL));
    }

    @Test
    @Transactional
    public void getNonExistingUsuarioUcentral() throws Exception {
        // Get the usuarioUcentral
        restUsuarioUcentralMockMvc.perform(get("/api/usuario-ucentrals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsuarioUcentral() throws Exception {
        // Initialize the database
        usuarioUcentralRepository.saveAndFlush(usuarioUcentral);

        int databaseSizeBeforeUpdate = usuarioUcentralRepository.findAll().size();

        // Update the usuarioUcentral
        UsuarioUcentral updatedUsuarioUcentral = usuarioUcentralRepository.findById(usuarioUcentral.getId()).get();
        // Disconnect from session so that the updates on updatedUsuarioUcentral are not directly saved in db
        em.detach(updatedUsuarioUcentral);
        updatedUsuarioUcentral
            .emailUcentral(UPDATED_EMAIL_UCENTRAL);

        restUsuarioUcentralMockMvc.perform(put("/api/usuario-ucentrals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsuarioUcentral)))
            .andExpect(status().isOk());

        // Validate the UsuarioUcentral in the database
        List<UsuarioUcentral> usuarioUcentralList = usuarioUcentralRepository.findAll();
        assertThat(usuarioUcentralList).hasSize(databaseSizeBeforeUpdate);
        UsuarioUcentral testUsuarioUcentral = usuarioUcentralList.get(usuarioUcentralList.size() - 1);
        assertThat(testUsuarioUcentral.getEmailUcentral()).isEqualTo(UPDATED_EMAIL_UCENTRAL);
    }

    @Test
    @Transactional
    public void updateNonExistingUsuarioUcentral() throws Exception {
        int databaseSizeBeforeUpdate = usuarioUcentralRepository.findAll().size();

        // Create the UsuarioUcentral

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioUcentralMockMvc.perform(put("/api/usuario-ucentrals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(usuarioUcentral)))
            .andExpect(status().isBadRequest());

        // Validate the UsuarioUcentral in the database
        List<UsuarioUcentral> usuarioUcentralList = usuarioUcentralRepository.findAll();
        assertThat(usuarioUcentralList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsuarioUcentral() throws Exception {
        // Initialize the database
        usuarioUcentralRepository.saveAndFlush(usuarioUcentral);

        int databaseSizeBeforeDelete = usuarioUcentralRepository.findAll().size();

        // Delete the usuarioUcentral
        restUsuarioUcentralMockMvc.perform(delete("/api/usuario-ucentrals/{id}", usuarioUcentral.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UsuarioUcentral> usuarioUcentralList = usuarioUcentralRepository.findAll();
        assertThat(usuarioUcentralList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
