package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class EstudianteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estudiante.class);
        Estudiante estudiante1 = new Estudiante();
        estudiante1.setId(1L);
        Estudiante estudiante2 = new Estudiante();
        estudiante2.setId(estudiante1.getId());
        assertThat(estudiante1).isEqualTo(estudiante2);
        estudiante2.setId(2L);
        assertThat(estudiante1).isNotEqualTo(estudiante2);
        estudiante1.setId(null);
        assertThat(estudiante1).isNotEqualTo(estudiante2);
    }
}
