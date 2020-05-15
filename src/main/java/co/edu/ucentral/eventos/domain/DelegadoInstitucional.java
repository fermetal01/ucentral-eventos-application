package co.edu.ucentral.eventos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A DelegadoInstitucional.
 */
@Entity
@Table(name = "delegado_institucional")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DelegadoInstitucional implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "delegado_institucional_institucion",
               joinColumns = @JoinColumn(name = "delegado_institucional_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "institucion_id", referencedColumnName = "id"))
    private Set<Institucion> institucions = new HashSet<>();

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

    public DelegadoInstitucional codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Persona getPersona() {
        return persona;
    }

    public DelegadoInstitucional persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Set<Institucion> getInstitucions() {
        return institucions;
    }

    public DelegadoInstitucional institucions(Set<Institucion> institucions) {
        this.institucions = institucions;
        return this;
    }

    public DelegadoInstitucional addInstitucion(Institucion institucion) {
        this.institucions.add(institucion);
        institucion.getDelegadoInstitucionals().add(this);
        return this;
    }

    public DelegadoInstitucional removeInstitucion(Institucion institucion) {
        this.institucions.remove(institucion);
        institucion.getDelegadoInstitucionals().remove(this);
        return this;
    }

    public void setInstitucions(Set<Institucion> institucions) {
        this.institucions = institucions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DelegadoInstitucional)) {
            return false;
        }
        return id != null && id.equals(((DelegadoInstitucional) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DelegadoInstitucional{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
