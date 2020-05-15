package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;

/**
 * A Inscripcion.
 */
@Entity
@Table(name = "inscripcion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Inscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_registro")
    private ZonedDateTime fechaRegistro;

    @Column(name = "aprobado_institucion")
    private Boolean aprobadoInstitucion;

    @Column(name = "aprobado_evento")
    private Boolean aprobadoEvento;

    @ManyToOne
    @JsonIgnoreProperties("inscripcions")
    private Evento evento;

    @ManyToOne
    @JsonIgnoreProperties("inscripcions")
    private Proyecto proyecto;

    @ManyToOne
    @JsonIgnoreProperties("inscripcions")
    private DelegadoInstitucional delegado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public Inscripcion fechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
        return this;
    }

    public void setFechaRegistro(ZonedDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Boolean isAprobadoInstitucion() {
        return aprobadoInstitucion;
    }

    public Inscripcion aprobadoInstitucion(Boolean aprobadoInstitucion) {
        this.aprobadoInstitucion = aprobadoInstitucion;
        return this;
    }

    public void setAprobadoInstitucion(Boolean aprobadoInstitucion) {
        this.aprobadoInstitucion = aprobadoInstitucion;
    }

    public Boolean isAprobadoEvento() {
        return aprobadoEvento;
    }

    public Inscripcion aprobadoEvento(Boolean aprobadoEvento) {
        this.aprobadoEvento = aprobadoEvento;
        return this;
    }

    public void setAprobadoEvento(Boolean aprobadoEvento) {
        this.aprobadoEvento = aprobadoEvento;
    }

    public Evento getEvento() {
        return evento;
    }

    public Inscripcion evento(Evento evento) {
        this.evento = evento;
        return this;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public Inscripcion proyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
        return this;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public DelegadoInstitucional getDelegado() {
        return delegado;
    }

    public Inscripcion delegado(DelegadoInstitucional delegadoInstitucional) {
        this.delegado = delegadoInstitucional;
        return this;
    }

    public void setDelegado(DelegadoInstitucional delegadoInstitucional) {
        this.delegado = delegadoInstitucional;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inscripcion)) {
            return false;
        }
        return id != null && id.equals(((Inscripcion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Inscripcion{" +
            "id=" + getId() +
            ", fechaRegistro='" + getFechaRegistro() + "'" +
            ", aprobadoInstitucion='" + isAprobadoInstitucion() + "'" +
            ", aprobadoEvento='" + isAprobadoEvento() + "'" +
            "}";
    }
}
