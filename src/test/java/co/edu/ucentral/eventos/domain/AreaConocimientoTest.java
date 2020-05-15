package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class AreaConocimientoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AreaConocimiento.class);
        AreaConocimiento areaConocimiento1 = new AreaConocimiento();
        areaConocimiento1.setId(1L);
        AreaConocimiento areaConocimiento2 = new AreaConocimiento();
        areaConocimiento2.setId(areaConocimiento1.getId());
        assertThat(areaConocimiento1).isEqualTo(areaConocimiento2);
        areaConocimiento2.setId(2L);
        assertThat(areaConocimiento1).isNotEqualTo(areaConocimiento2);
        areaConocimiento1.setId(null);
        assertThat(areaConocimiento1).isNotEqualTo(areaConocimiento2);
    }
}
