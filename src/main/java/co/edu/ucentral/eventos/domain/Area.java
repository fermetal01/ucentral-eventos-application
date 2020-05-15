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
 * A Area.
 */
@Entity
@Table(name = "area")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Area implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "capacidad")
    private Integer capacidad;

    @Column(name = "ubicacion")
    private String ubicacion;

    @ManyToOne
    @JsonIgnoreProperties("areas")
    private TipoArea tipoArea;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "area_evento",
               joinColumns = @JoinColumn(name = "area_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "evento_id", referencedColumnName = "id"))
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

    public Area nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public Area capacidad(Integer capacidad) {
        this.capacidad = capacidad;
        return this;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Area ubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public TipoArea getTipoArea() {
        return tipoArea;
    }

    public Area tipoArea(TipoArea tipoArea) {
        this.tipoArea = tipoArea;
        return this;
    }

    public void setTipoArea(TipoArea tipoArea) {
        this.tipoArea = tipoArea;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Area eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Area addEvento(Evento evento) {
        this.eventos.add(evento);
        evento.getAreas().add(this);
        return this;
    }

    public Area removeEvento(Evento evento) {
        this.eventos.remove(evento);
        evento.getAreas().remove(this);
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
        if (!(o instanceof Area)) {
            return false;
        }
        return id != null && id.equals(((Area) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", capacidad=" + getCapacidad() +
            ", ubicacion='" + getUbicacion() + "'" +
            "}";
    }
}
