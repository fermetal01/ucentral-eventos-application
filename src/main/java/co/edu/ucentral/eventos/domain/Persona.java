package co.edu.ucentral.eventos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombres")
    private String nombres;

    @Column(name = "apellidos")
    private String apellidos;

    @Column(name = "numero_idenficacion")
    private String numeroIdenficacion;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("personas")
    private Ciudad ciudad;

    @ManyToOne
    @JsonIgnoreProperties("personas")
    private TipoIdentificacion tipoIdentificacion;

    @OneToOne(mappedBy = "persona")
    @JsonIgnore
    private Estudiante estudiante;

    @OneToOne(mappedBy = "persona")
    @JsonIgnore
    private UsuarioUcentral usuarioUcentral;

    @OneToOne(mappedBy = "persona")
    @JsonIgnore
    private Profesor profesor;

    @OneToOne(mappedBy = "persona")
    @JsonIgnore
    private DelegadoInstitucional delegadoInstitucional;

    @OneToOne(mappedBy = "persona")
    @JsonIgnore
    private Evaluador evaluador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public Persona nombres(String nombres) {
        this.nombres = nombres;
        return this;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Persona apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNumeroIdenficacion() {
        return numeroIdenficacion;
    }

    public Persona numeroIdenficacion(String numeroIdenficacion) {
        this.numeroIdenficacion = numeroIdenficacion;
        return this;
    }

    public void setNumeroIdenficacion(String numeroIdenficacion) {
        this.numeroIdenficacion = numeroIdenficacion;
    }

    public String getEmail() {
        return email;
    }

    public Persona email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Ciudad getCiudad() {
        return ciudad;
    }

    public Persona ciudad(Ciudad ciudad) {
        this.ciudad = ciudad;
        return this;
    }

    public void setCiudad(Ciudad ciudad) {
        this.ciudad = ciudad;
    }

    public TipoIdentificacion getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public Persona tipoIdentificacion(TipoIdentificacion tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
        return this;
    }

    public void setTipoIdentificacion(TipoIdentificacion tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public Persona estudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
        return this;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    public UsuarioUcentral getUsuarioUcentral() {
        return usuarioUcentral;
    }

    public Persona usuarioUcentral(UsuarioUcentral usuarioUcentral) {
        this.usuarioUcentral = usuarioUcentral;
        return this;
    }

    public void setUsuarioUcentral(UsuarioUcentral usuarioUcentral) {
        this.usuarioUcentral = usuarioUcentral;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public Persona profesor(Profesor profesor) {
        this.profesor = profesor;
        return this;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public DelegadoInstitucional getDelegadoInstitucional() {
        return delegadoInstitucional;
    }

    public Persona delegadoInstitucional(DelegadoInstitucional delegadoInstitucional) {
        this.delegadoInstitucional = delegadoInstitucional;
        return this;
    }

    public void setDelegadoInstitucional(DelegadoInstitucional delegadoInstitucional) {
        this.delegadoInstitucional = delegadoInstitucional;
    }

    public Evaluador getEvaluador() {
        return evaluador;
    }

    public Persona evaluador(Evaluador evaluador) {
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
        if (!(o instanceof Persona)) {
            return false;
        }
        return id != null && id.equals(((Persona) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombres='" + getNombres() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", numeroIdenficacion='" + getNumeroIdenficacion() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
