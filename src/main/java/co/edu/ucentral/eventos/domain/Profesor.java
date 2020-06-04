package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToMany(mappedBy = "profesors")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Semillero> semilleros = new HashSet<>();

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

    public Set<Semillero> getSemilleros() {
        return semilleros;
    }

    public Profesor semilleros(Set<Semillero> semilleros) {
        this.semilleros = semilleros;
        return this;
    }

    public Profesor addSemillero(Semillero semillero) {
        this.semilleros.add(semillero);
        semillero.getProfesors().add(this);
        return this;
    }

    public Profesor removeSemillero(Semillero semillero) {
        this.semilleros.remove(semillero);
        semillero.getProfesors().remove(this);
        return this;
    }

    public void setSemilleros(Set<Semillero> semilleros) {
        this.semilleros = semilleros;
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
