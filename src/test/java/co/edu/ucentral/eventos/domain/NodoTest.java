package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class NodoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nodo.class);
        Nodo nodo1 = new Nodo();
        nodo1.setId(1L);
        Nodo nodo2 = new Nodo();
        nodo2.setId(nodo1.getId());
        assertThat(nodo1).isEqualTo(nodo2);
        nodo2.setId(2L);
        assertThat(nodo1).isNotEqualTo(nodo2);
        nodo1.setId(null);
        assertThat(nodo1).isNotEqualTo(nodo2);
    }
}
