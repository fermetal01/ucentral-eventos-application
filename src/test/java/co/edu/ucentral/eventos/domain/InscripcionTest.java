package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class InscripcionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inscripcion.class);
        Inscripcion inscripcion1 = new Inscripcion();
        inscripcion1.setId(1L);
        Inscripcion inscripcion2 = new Inscripcion();
        inscripcion2.setId(inscripcion1.getId());
        assertThat(inscripcion1).isEqualTo(inscripcion2);
        inscripcion2.setId(2L);
        assertThat(inscripcion1).isNotEqualTo(inscripcion2);
        inscripcion1.setId(null);
        assertThat(inscripcion1).isNotEqualTo(inscripcion2);
    }
}
