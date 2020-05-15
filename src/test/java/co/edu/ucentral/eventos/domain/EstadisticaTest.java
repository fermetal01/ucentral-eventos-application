package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class EstadisticaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estadistica.class);
        Estadistica estadistica1 = new Estadistica();
        estadistica1.setId(1L);
        Estadistica estadistica2 = new Estadistica();
        estadistica2.setId(estadistica1.getId());
        assertThat(estadistica1).isEqualTo(estadistica2);
        estadistica2.setId(2L);
        assertThat(estadistica1).isNotEqualTo(estadistica2);
        estadistica1.setId(null);
        assertThat(estadistica1).isNotEqualTo(estadistica2);
    }
}
