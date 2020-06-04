package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Semillero.
 */
@Entity
@Table(name = "semillero")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Semillero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JsonIgnoreProperties("semilleros")
    private Institucion institucion;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "semillero_profesor",
               joinColumns = @JoinColumn(name = "semillero_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "profesor_id", referencedColumnName = "id"))
    private Set<Profesor> profesors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Semillero nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Institucion getInstitucion() {
        return institucion;
    }

    public Semillero institucion(Institucion institucion) {
        this.institucion = institucion;
        return this;
    }

    public void setInstitucion(Institucion institucion) {
        this.institucion = institucion;
    }

    public Set<Profesor> getProfesors() {
        return profesors;
    }

    public Semillero profesors(Set<Profesor> profesors) {
        this.profesors = profesors;
        return this;
    }

    public Semillero addProfesor(Profesor profesor) {
        this.profesors.add(profesor);
        profesor.getSemilleros().add(this);
        return this;
    }

    public Semillero removeProfesor(Profesor profesor) {
        this.profesors.remove(profesor);
        profesor.getSemilleros().remove(this);
        return this;
    }

    public void setProfesors(Set<Profesor> profesors) {
        this.profesors = profesors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Semillero)) {
            return false;
        }
        return id != null && id.equals(((Semillero) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Semillero{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
