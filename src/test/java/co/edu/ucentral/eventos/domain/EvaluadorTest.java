package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class EvaluadorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evaluador.class);
        Evaluador evaluador1 = new Evaluador();
        evaluador1.setId(1L);
        Evaluador evaluador2 = new Evaluador();
        evaluador2.setId(evaluador1.getId());
        assertThat(evaluador1).isEqualTo(evaluador2);
        evaluador2.setId(2L);
        assertThat(evaluador1).isNotEqualTo(evaluador2);
        evaluador1.setId(null);
        assertThat(evaluador1).isNotEqualTo(evaluador2);
    }
}
