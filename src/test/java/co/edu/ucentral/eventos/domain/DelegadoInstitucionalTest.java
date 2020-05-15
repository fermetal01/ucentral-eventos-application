package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class DelegadoInstitucionalTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DelegadoInstitucional.class);
        DelegadoInstitucional delegadoInstitucional1 = new DelegadoInstitucional();
        delegadoInstitucional1.setId(1L);
        DelegadoInstitucional delegadoInstitucional2 = new DelegadoInstitucional();
        delegadoInstitucional2.setId(delegadoInstitucional1.getId());
        assertThat(delegadoInstitucional1).isEqualTo(delegadoInstitucional2);
        delegadoInstitucional2.setId(2L);
        assertThat(delegadoInstitucional1).isNotEqualTo(delegadoInstitucional2);
        delegadoInstitucional1.setId(null);
        assertThat(delegadoInstitucional1).isNotEqualTo(delegadoInstitucional2);
    }
}
