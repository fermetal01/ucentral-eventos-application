package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class EvaluacionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evaluacion.class);
        Evaluacion evaluacion1 = new Evaluacion();
        evaluacion1.setId(1L);
        Evaluacion evaluacion2 = new Evaluacion();
        evaluacion2.setId(evaluacion1.getId());
        assertThat(evaluacion1).isEqualTo(evaluacion2);
        evaluacion2.setId(2L);
        assertThat(evaluacion1).isNotEqualTo(evaluacion2);
        evaluacion1.setId(null);
        assertThat(evaluacion1).isNotEqualTo(evaluacion2);
    }
}
