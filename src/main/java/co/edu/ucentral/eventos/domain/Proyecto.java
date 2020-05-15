package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Proyecto.
 */
@Entity
@Table(name = "proyecto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proyecto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fecha_registro")
    private ZonedDateTime fechaRegistro;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private ProyectoCategoria categoria;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private AreaConocimiento areaConocimiento;

    @ManyToOne
    @JsonIgnoreProperties("proyectos")
    private Semillero semillero;

    @ManyToMany(mappedBy = "proyectos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Estudiante> estudiantes = new HashSet<>();

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

    public Proyecto nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ZonedDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public Proyecto fechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
        return this;
    }

    public void setFechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public ProyectoCategoria getCategoria() {
        return categoria;
    }

    public Proyecto categoria(ProyectoCategoria proyectoCategoria) {
        this.categoria = proyectoCategoria;
        return this;
    }

    public void setCategoria(ProyectoCategoria proyectoCategoria) {
        this.categoria = proyectoCategoria;
    }

    public AreaConocimiento getAreaConocimiento() {
        return areaConocimiento;
    }

    public Proyecto areaConocimiento(AreaConocimiento areaConocimiento) {
        this.areaConocimiento = areaConocimiento;
        return this;
    }

    public void setAreaConocimiento(AreaConocimiento areaConocimiento) {
        this.areaConocimiento = areaConocimiento;
    }

    public Semillero getSemillero() {
        return semillero;
    }

    public Proyecto semillero(Semillero semillero) {
        this.semillero = semillero;
        return this;
    }

    public void setSemillero(Semillero semillero) {
        this.semillero = semillero;
    }

    public Set<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    public Proyecto estudiantes(Set<Estudiante> estudiantes) {
        this.estudiantes = estudiantes;
        return this;
    }

    public Proyecto addEstudiante(Estudiante estudiante) {
        this.estudiantes.add(estudiante);
        estudiante.getProyectos().add(this);
        return this;
    }

    public Proyecto removeEstudiante(Estudiante estudiante) {
        this.estudiantes.remove(estudiante);
        estudiante.getProyectos().remove(this);
        return this;
    }

    public void setEstudiantes(Set<Estudiante> estudiantes) {
        this.estudiantes = estudiantes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proyecto)) {
            return false;
        }
        return id != null && id.equals(((Proyecto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Proyecto{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", fechaRegistro='" + getFechaRegistro() + "'" +
            "}";
    }
}
