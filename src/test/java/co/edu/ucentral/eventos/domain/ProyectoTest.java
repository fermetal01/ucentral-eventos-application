package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class ProyectoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proyecto.class);
        Proyecto proyecto1 = new Proyecto();
        proyecto1.setId(1L);
        Proyecto proyecto2 = new Proyecto();
        proyecto2.setId(proyecto1.getId());
        assertThat(proyecto1).isEqualTo(proyecto2);
        proyecto2.setId(2L);
        assertThat(proyecto1).isNotEqualTo(proyecto2);
        proyecto1.setId(null);
        assertThat(proyecto1).isNotEqualTo(proyecto2);
    }
}
