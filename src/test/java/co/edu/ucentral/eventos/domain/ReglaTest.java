package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class ReglaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Regla.class);
        Regla regla1 = new Regla();
        regla1.setId(1L);
        Regla regla2 = new Regla();
        regla2.setId(regla1.getId());
        assertThat(regla1).isEqualTo(regla2);
        regla2.setId(2L);
        assertThat(regla1).isNotEqualTo(regla2);
        regla1.setId(null);
        assertThat(regla1).isNotEqualTo(regla2);
    }
}
