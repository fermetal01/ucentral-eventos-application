package co.edu.ucentral.eventos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Regla.
 */
@Entity
@Table(name = "regla")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Regla implements Serializable {

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

    @Column(name = "auxiliar")
    private String auxiliar;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "regla_evento",
               joinColumns = @JoinColumn(name = "regla_id", referencedColumnName = "id"),
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

    public Regla nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLlave() {
        return llave;
    }

    public Regla llave(String llave) {
        this.llave = llave;
        return this;
    }

    public void setLlave(String llave) {
        this.llave = llave;
    }

    public String getValor() {
        return valor;
    }

    public Regla valor(String valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getAuxiliar() {
        return auxiliar;
    }

    public Regla auxiliar(String auxiliar) {
        this.auxiliar = auxiliar;
        return this;
    }

    public void setAuxiliar(String auxiliar) {
        this.auxiliar = auxiliar;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Regla eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Regla addEvento(Evento evento) {
        this.eventos.add(evento);
        evento.getReglas().add(this);
        return this;
    }

    public Regla removeEvento(Evento evento) {
        this.eventos.remove(evento);
        evento.getReglas().remove(this);
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
        if (!(o instanceof Regla)) {
            return false;
        }
        return id != null && id.equals(((Regla) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Regla{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", llave='" + getLlave() + "'" +
            ", valor='" + getValor() + "'" +
            ", auxiliar='" + getAuxiliar() + "'" +
            "}";
    }
}
