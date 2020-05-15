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
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "fecha_inicio")
    private ZonedDateTime fechaInicio;

    @Column(name = "fecha_fin")
    private ZonedDateTime fechaFin;

    @Column(name = "ubicacion")
    private String ubicacion;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private Ciudad ciudad;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private Nodo nodo;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "evento_area_conocimiento",
               joinColumns = @JoinColumn(name = "evento_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "area_conocimiento_id", referencedColumnName = "id"))
    private Set<AreaConocimiento> areaConocimientos = new HashSet<>();

    @ManyToMany(mappedBy = "eventos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Area> areas = new HashSet<>();

    @ManyToMany(mappedBy = "eventos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Regla> reglas = new HashSet<>();

    @ManyToMany(mappedBy = "eventos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Estadistica> estadisticas = new HashSet<>();

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

    public Evento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ZonedDateTime getFechaInicio() {
        return fechaInicio;
    }

    public Evento fechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public ZonedDateTime getFechaFin() {
        return fechaFin;
    }

    public Evento fechaFin(ZonedDateTime fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(ZonedDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Evento ubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Evento ciudad(Ciudad ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public Nodo getNodo() {
        return nodo;
    }

    public Evento nodo(Nodo nodo) {
        this.nodo = nodo;
        return this;
    }

    public void setNodo(Nodo nodo) {
        this.nodo = nodo;
    }

    public Set<AreaConocimiento> getAreaConocimientos() {
        return areaConocimientos;
    }

    public Evento areaConocimientos(Set<AreaConocimiento> areaConocimientos) {
        this.areaConocimientos = areaConocimientos;
        return this;
    }

    public Evento addAreaConocimiento(AreaConocimiento areaConocimiento) {
        this.areaConocimientos.add(areaConocimiento);
        areaConocimiento.getEventos().add(this);
        return this;
    }

    public Evento removeAreaConocimiento(AreaConocimiento areaConocimiento) {
        this.areaConocimientos.remove(areaConocimiento);
        areaConocimiento.getEventos().remove(this);
        return this;
    }

    public void setAreaConocimientos(Set<AreaConocimiento> areaConocimientos) {
        this.areaConocimientos = areaConocimientos;
    }

    public Set<Area> getAreas() {
        return areas;
    }

    public Evento areas(Set<Area> areas) {
        this.areas = areas;
        return this;
    }

    public Evento addArea(Area area) {
        this.areas.add(area);
        area.getEventos().add(this);
        return this;
    }

    public Evento removeArea(Area area) {
        this.areas.remove(area);
        area.getEventos().remove(this);
        return this;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }

    public Set<Regla> getReglas() {
        return reglas;
    }

    public Evento reglas(Set<Regla> reglas) {
        this.reglas = reglas;
        return this;
    }

    public Evento addRegla(Regla regla) {
        this.reglas.add(regla);
        regla.getEventos().add(this);
        return this;
    }

    public Evento removeRegla(Regla regla) {
        this.reglas.remove(regla);
        regla.getEventos().remove(this);
        return this;
    }

    public void setReglas(Set<Regla> reglas) {
        this.reglas = reglas;
    }

    public Set<Estadistica> getEstadisticas() {
        return estadisticas;
    }

    public Evento estadisticas(Set<Estadistica> estadisticas) {
        this.estadisticas = estadisticas;
        return this;
    }

    public Evento addEstadistica(Estadistica estadistica) {
        this.estadisticas.add(estadistica);
        estadistica.getEventos().add(this);
        return this;
    }

    public Evento removeEstadistica(Estadistica estadistica) {
        this.estadisticas.remove(estadistica);
        estadistica.getEventos().remove(this);
        return this;
    }

    public void setEstadisticas(Set<Estadistica> estadisticas) {
        this.estadisticas = estadisticas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Evento)) {
            return false;
        }
        return id != null && id.equals(((Evento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", ubicacion='" + getUbicacion() + "'" +
            "}";
    }
}
