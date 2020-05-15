package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Evaluacion.
 */
@Entity
@Table(name = "evaluacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "calificacion")
    private Float calificacion;

    @Column(name = "observaciones")
    private String observaciones;

    @ManyToOne
    @JsonIgnoreProperties("evaluacions")
    private Ponencia ponencia;

    @ManyToOne
    @JsonIgnoreProperties("evaluacions")
    private Evaluador evaluador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCalificacion() {
        return calificacion;
    }

    public Evaluacion calificacion(Float calificacion) {
        this.calificacion = calificacion;
        return this;
    }

    public void setCalificacion(Float calificacion) {
        this.calificacion = calificacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Evaluacion observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Ponencia getPonencia() {
        return ponencia;
    }

    public Evaluacion ponencia(Ponencia ponencia) {
        this.ponencia = ponencia;
        return this;
    }

    public void setPonencia(Ponencia ponencia) {
        this.ponencia = ponencia;
    }

    public Evaluador getEvaluador() {
        return evaluador;
    }

    public Evaluacion evaluador(Evaluador evaluador) {
        this.evaluador = evaluador;
        return this;
    }

    public void setEvaluador(Evaluador evaluador) {
        this.evaluador = evaluador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Evaluacion)) {
            return false;
        }
        return id != null && id.equals(((Evaluacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Evaluacion{" +
            "id=" + getId() +
            ", calificacion=" + getCalificacion() +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
