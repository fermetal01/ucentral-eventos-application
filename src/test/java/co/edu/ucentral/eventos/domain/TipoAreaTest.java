package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class TipoAreaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoArea.class);
        TipoArea tipoArea1 = new TipoArea();
        tipoArea1.setId(1L);
        TipoArea tipoArea2 = new TipoArea();
        tipoArea2.setId(tipoArea1.getId());
        assertThat(tipoArea1).isEqualTo(tipoArea2);
        tipoArea2.setId(2L);
        assertThat(tipoArea1).isNotEqualTo(tipoArea2);
        tipoArea1.setId(null);
        assertThat(tipoArea1).isNotEqualTo(tipoArea2);
    }
}
