package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class ProyectoCategoriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProyectoCategoria.class);
        ProyectoCategoria proyectoCategoria1 = new ProyectoCategoria();
        proyectoCategoria1.setId(1L);
        ProyectoCategoria proyectoCategoria2 = new ProyectoCategoria();
        proyectoCategoria2.setId(proyectoCategoria1.getId());
        assertThat(proyectoCategoria1).isEqualTo(proyectoCategoria2);
        proyectoCategoria2.setId(2L);
        assertThat(proyectoCategoria1).isNotEqualTo(proyectoCategoria2);
        proyectoCategoria1.setId(null);
        assertThat(proyectoCategoria1).isNotEqualTo(proyectoCategoria2);
    }
}
