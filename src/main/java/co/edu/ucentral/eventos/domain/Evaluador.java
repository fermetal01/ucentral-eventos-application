package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Evaluador.
 */
@Entity
@Table(name = "evaluador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "activo")
    private Boolean activo;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    @ManyToMany(mappedBy = "evaluadors")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Ponencia> ponencias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Evaluador codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Evaluador activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Persona getPersona() {
        return persona;
    }

    public Evaluador persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Set<Ponencia> getPonencias() {
        return ponencias;
    }

    public Evaluador ponencias(Set<Ponencia> ponencias) {
        this.ponencias = ponencias;
        return this;
    }

    public Evaluador addPonencia(Ponencia ponencia) {
        this.ponencias.add(ponencia);
        ponencia.getEvaluadors().add(this);
        return this;
    }

    public Evaluador removePonencia(Ponencia ponencia) {
        this.ponencias.remove(ponencia);
        ponencia.getEvaluadors().remove(this);
        return this;
    }

    public void setPonencias(Set<Ponencia> ponencias) {
        this.ponencias = ponencias;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Evaluador)) {
            return false;
        }
        return id != null && id.equals(((Evaluador) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Evaluador{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", activo='" + isActivo() + "'" +
            "}";
    }
}
