package co.edu.ucentral.eventos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Estadistica.
 */
@Entity
@Table(name = "estadistica")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estadistica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "llave")
    private String llave;

    @Column(name = "valor")
    private String valor;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "estadistica_evento",
               joinColumns = @JoinColumn(name = "estadistica_id", referencedColumnName = "id"),
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

    public Estadistica nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLlave() {
        return llave;
    }

    public Estadistica llave(String llave) {
        this.llave = llave;
        return this;
    }

    public void setLlave(String llave) {
        this.llave = llave;
    }

    public String getValor() {
        return valor;
    }

    public Estadistica valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Estadistica descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Estadistica eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Estadistica addEvento(Evento evento) {
        this.eventos.add(evento);
        evento.getEstadisticas().add(this);
        return this;
    }

    public Estadistica removeEvento(Evento evento) {
        this.eventos.remove(evento);
        evento.getEstadisticas().remove(this);
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
        if (!(o instanceof Estadistica)) {
            return false;
        }
        return id != null && id.equals(((Estadistica) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estadistica{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", llave='" + getLlave() + "'" +
            ", valor='" + getValor() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
