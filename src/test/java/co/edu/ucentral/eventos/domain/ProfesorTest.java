package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class ProfesorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Profesor.class);
        Profesor profesor1 = new Profesor();
        profesor1.setId(1L);
        Profesor profesor2 = new Profesor();
        profesor2.setId(profesor1.getId());
        assertThat(profesor1).isEqualTo(profesor2);
        profesor2.setId(2L);
        assertThat(profesor1).isNotEqualTo(profesor2);
        profesor1.setId(null);
        assertThat(profesor1).isNotEqualTo(profesor2);
    }
}
