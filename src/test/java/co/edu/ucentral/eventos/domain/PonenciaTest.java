package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class PonenciaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ponencia.class);
        Ponencia ponencia1 = new Ponencia();
        ponencia1.setId(1L);
        Ponencia ponencia2 = new Ponencia();
        ponencia2.setId(ponencia1.getId());
        assertThat(ponencia1).isEqualTo(ponencia2);
        ponencia2.setId(2L);
        assertThat(ponencia1).isNotEqualTo(ponencia2);
        ponencia1.setId(null);
        assertThat(ponencia1).isNotEqualTo(ponencia2);
    }
}
