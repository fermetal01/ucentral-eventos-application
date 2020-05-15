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
 * A Estudiante.
 */
@Entity
@Table(name = "estudiante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estudiante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "carrera")
    private String carrera;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    @ManyToOne
    @JsonIgnoreProperties("estudiantes")
    private Programa programa;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "estudiante_proyecto",
               joinColumns = @JoinColumn(name = "estudiante_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "proyecto_id", referencedColumnName = "id"))
    private Set<Proyecto> proyectos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCarrera() {
        return carrera;
    }

    public Estudiante carrera(String carrera) {
        this.carrera = carrera;
        return this;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public Persona getPersona() {
        return persona;
    }

    public Estudiante persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Programa getPrograma() {
        return programa;
    }

    public Estudiante programa(Programa programa) {
        this.programa = programa;
        return this;
    }

    public void setPrograma(Programa programa) {
        this.programa = programa;
    }

    public Set<Proyecto> getProyectos() {
        return proyectos;
    }

    public Estudiante proyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
        return this;
    }

    public Estudiante addProyecto(Proyecto proyecto) {
        this.proyectos.add(proyecto);
        proyecto.getEstudiantes().add(this);
        return this;
    }

    public Estudiante removeProyecto(Proyecto proyecto) {
        this.proyectos.remove(proyecto);
        proyecto.getEstudiantes().remove(this);
        return this;
    }

    public void setProyectos(Set<Proyecto> proyectos) {
        this.proyectos = proyectos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estudiante)) {
            return false;
        }
        return id != null && id.equals(((Estudiante) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estudiante{" +
            "id=" + getId() +
            ", carrera='" + getCarrera() + "'" +
            "}";
    }
}
