package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A AreaConocimiento.
 */
@Entity
@Table(name = "area_conocimiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AreaConocimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne
    @JsonIgnoreProperties("areaConocimientos")
    private AreaConocimiento padre;

    @ManyToMany(mappedBy = "areaConocimientos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Evento> eventos = new HashSet<>();

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

    public AreaConocimiento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public AreaConocimiento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public AreaConocimiento getPadre() {
        return padre;
    }

    public AreaConocimiento padre(AreaConocimiento areaConocimiento) {
        this.padre = areaConocimiento;
        return this;
    }

    public void setPadre(AreaConocimiento areaConocimiento) {
        this.padre = areaConocimiento;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public AreaConocimiento eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public AreaConocimiento addEvento(Evento evento) {
        this.eventos.add(evento);
        evento.getAreaConocimientos().add(this);
        return this;
    }

    public AreaConocimiento removeEvento(Evento evento) {
        this.eventos.remove(evento);
        evento.getAreaConocimientos().remove(this);
        return this;
    }

    public void setEventos(Set<Evento> eventos) {
        this.eventos = eventos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AreaConocimiento)) {
            return false;
        }
        return id != null && id.equals(((AreaConocimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AreaConocimiento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
