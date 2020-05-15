package co.edu.ucentral.eventos.domain;

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
 * A Ponencia.
 */
@Entity
@Table(name = "ponencia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ponencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio")
    private ZonedDateTime fechaInicio;

    @Column(name = "fecha_fin")
    private ZonedDateTime fechaFin;

    @ManyToOne
    @JsonIgnoreProperties("ponencias")
    private Area area;

    @ManyToOne
    @JsonIgnoreProperties("ponencias")
    private Evento evento;

    @ManyToOne
    @JsonIgnoreProperties("ponencias")
    private Proyecto proyecto;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "ponencia_evaluador",
               joinColumns = @JoinColumn(name = "ponencia_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "evaluador_id", referencedColumnName = "id"))
    private Set<Evaluador> evaluadors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaInicio() {
        return fechaInicio;
    }

    public Ponencia fechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public ZonedDateTime getFechaFin() {
        return fechaFin;
    }

    public Ponencia fechaFin(ZonedDateTime fechaFin) {
        this.fechaFin = fechaFin;
        return this;
    }

    public void setFechaFin(ZonedDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Area getArea() {
        return area;
    }

    public Ponencia area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Evento getEvento() {
        return evento;
    }

    public Ponencia evento(Evento evento) {
        this.evento = evento;
        return this;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public Ponencia proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Set<Evaluador> getEvaluadors() {
        return evaluadors;
    }

    public Ponencia evaluadors(Set<Evaluador> evaluadors) {
        this.evaluadors = evaluadors;
        return this;
    }

    public Ponencia addEvaluador(Evaluador evaluador) {
        this.evaluadors.add(evaluador);
        evaluador.getPonencias().add(this);
        return this;
    }

    public Ponencia removeEvaluador(Evaluador evaluador) {
        this.evaluadors.remove(evaluador);
        evaluador.getPonencias().remove(this);
        return this;
    }

    public void setEvaluadors(Set<Evaluador> evaluadors) {
        this.evaluadors = evaluadors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ponencia)) {
            return false;
        }
        return id != null && id.equals(((Ponencia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ponencia{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            "}";
    }
}
