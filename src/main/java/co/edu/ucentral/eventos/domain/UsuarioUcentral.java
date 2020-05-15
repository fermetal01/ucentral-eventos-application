package co.edu.ucentral.eventos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UsuarioUcentral.
 */
@Entity
@Table(name = "usuario_ucentral")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UsuarioUcentral implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email_ucentral")
    private String emailUcentral;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailUcentral() {
        return emailUcentral;
    }

    public UsuarioUcentral emailUcentral(String emailUcentral) {
        this.emailUcentral = emailUcentral;
        return this;
    }

    public void setEmailUcentral(String emailUcentral) {
        this.emailUcentral = emailUcentral;
    }

    public User getUser() {
        return user;
    }

    public UsuarioUcentral user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Persona getPersona() {
        return persona;
    }

    public UsuarioUcentral persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UsuarioUcentral)) {
            return false;
        }
        return id != null && id.equals(((UsuarioUcentral) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UsuarioUcentral{" +
            "id=" + getId() +
            ", emailUcentral='" + getEmailUcentral() + "'" +
            "}";
    }
}
