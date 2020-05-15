package co.edu.ucentral.eventos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import co.edu.ucentral.eventos.web.rest.TestUtil;

public class UsuarioUcentralTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioUcentral.class);
        UsuarioUcentral usuarioUcentral1 = new UsuarioUcentral();
        usuarioUcentral1.setId(1L);
        UsuarioUcentral usuarioUcentral2 = new UsuarioUcentral();
        usuarioUcentral2.setId(usuarioUcentral1.getId());
        assertThat(usuarioUcentral1).isEqualTo(usuarioUcentral2);
        usuarioUcentral2.setId(2L);
        assertThat(usuarioUcentral1).isNotEqualTo(usuarioUcentral2);
        usuarioUcentral1.setId(null);
        assertThat(usuarioUcentral1).isNotEqualTo(usuarioUcentral2);
    }
}
