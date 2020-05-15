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
 * A Institucion.
 */
@Entity
@Table(name = "institucion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Institucion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "web")
    private String web;

    @Column(name = "fecha_registro")
    private ZonedDateTime fechaRegistro;

    @ManyToOne
    @JsonIgnoreProperties("institucions")
    private Ciudad ciudad;

    @ManyToOne
    @JsonIgnoreProperties("institucions")
    private Nodo nodo;

    @ManyToMany(mappedBy = "institucions")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<DelegadoInstitucional> delegadoInstitucionals = new HashSet<>();

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

    public Institucion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getWeb() {
        return web;
    }

    public Institucion web(String web) {
        this.web = web;
        return this;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public ZonedDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public Institucion fechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
        return this;
    }

    public void setFechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Institucion ciudad(Ciudad ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Nodo getNodo() {
        return nodo;
    }

    public Institucion nodo(Nodo nodo) {
        this.nodo = nodo;
        return this;
    }

    public void setNodo(Nodo nodo) {
        this.nodo = nodo;
    }

    public Set<DelegadoInstitucional> getDelegadoInstitucionals() {
        return delegadoInstitucionals;
    }

    public Institucion delegadoInstitucionals(Set<DelegadoInstitucional> delegadoInstitucionals) {
        this.delegadoInstitucionals = delegadoInstitucionals;
        return this;
    }

    public Institucion addDelegadoInstitucional(DelegadoInstitucional delegadoInstitucional) {
        this.delegadoInstitucionals.add(delegadoInstitucional);
        delegadoInstitucional.getInstitucions().add(this);
        return this;
    }

    public Institucion removeDelegadoInstitucional(DelegadoInstitucional delegadoInstitucional) {
        this.delegadoInstitucionals.remove(delegadoInstitucional);
        delegadoInstitucional.getInstitucions().remove(this);
        return this;
    }

    public void setDelegadoInstitucionals(Set<DelegadoInstitucional> delegadoInstitucionals) {
        this.delegadoInstitucionals = delegadoInstitucionals;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Institucion)) {
            return false;
        }
        return id != null && id.equals(((Institucion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Institucion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", web='" + getWeb() + "'" +
            ", fechaRegistro='" + getFechaRegistro() + "'" +
            "}";
    }
}
