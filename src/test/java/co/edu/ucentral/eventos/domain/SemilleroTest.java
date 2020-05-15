package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class SemilleroTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Semillero.class);
        Semillero semillero1 = new Semillero();
        semillero1.setId(1L);
        Semillero semillero2 = new Semillero();
        semillero2.setId(semillero1.getId());
        assertThat(semillero1).isEqualTo(semillero2);
        semillero2.setId(2L);
        assertThat(semillero1).isNotEqualTo(semillero2);
        semillero1.setId(null);
        assertThat(semillero1).isNotEqualTo(semillero2);
    }
}
