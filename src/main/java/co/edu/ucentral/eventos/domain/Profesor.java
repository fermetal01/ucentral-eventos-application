package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Profesor.
 */
@Entity
@Table(name = "profesor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profesor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "area")
    private String area;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    @OneToOne(mappedBy = "profesor")
    @JsonIgnore
    private Semillero semillero;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public Profesor area(String area) {
        this.area = area;
        return this;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Persona getPersona() {
        return persona;
    }

    public Profesor persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Semillero getSemillero() {
        return semillero;
    }

    public Profesor semillero(Semillero semillero) {
        this.semillero = semillero;
        return this;
    }

    public void setSemillero(Semillero semillero) {
        this.semillero = semillero;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profesor)) {
            return false;
        }
        return id != null && id.equals(((Profesor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Profesor{" +
            "id=" + getId() +
            ", area='" + getArea() + "'" +
            "}";
    }
}
