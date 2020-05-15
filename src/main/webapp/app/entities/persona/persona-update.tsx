import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICiudad } from 'app/shared/model/ciudad.model';
import { getEntities as getCiudads } from 'app/entities/ciudad/ciudad.reducer';
import { ITipoIdentificacion } from 'app/shared/model/tipo-identificacion.model';
import { getEntities as getTipoIdentificacions } from 'app/entities/tipo-identificacion/tipo-identificacion.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { getEntities as getUsuarioUcentrals } from 'app/entities/usuario-ucentral/usuario-ucentral.reducer';
import { IProfesor } from 'app/shared/model/profesor.model';
import { getEntities as getProfesors } from 'app/entities/profesor/profesor.reducer';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { getEntities as getDelegadoInstitucionals } from 'app/entities/delegado-institucional/delegado-institucional.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { getEntities as getEvaluadors } from 'app/entities/evaluador/evaluador.reducer';
import { getEntity, updateEntity, createEntity, reset } from './persona.reducer';
import { IPersona } from 'app/shared/model/persona.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPersonaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonaUpdate = (props: IPersonaUpdateProps) => {
  const [ciudadId, setCiudadId] = useState('0');
  const [tipoIdentificacionId, setTipoIdentificacionId] = useState('0');
  const [estudianteId, setEstudianteId] = useState('0');
  const [usuarioUcentralId, setUsuarioUcentralId] = useState('0');
  const [profesorId, setProfesorId] = useState('0');
  const [delegadoInstitucionalId, setDelegadoInstitucionalId] = useState('0');
  const [evaluadorId, setEvaluadorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    personaEntity,
    ciudads,
    tipoIdentificacions,
    estudiantes,
    usuarioUcentrals,
    profesors,
    delegadoInstitucionals,
    evaluadors,
    loading,
    updating
  } = props;

  const handleClose = () => {
    props.history.push('/persona');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCiudads();
    props.getTipoIdentificacions();
    props.getEstudiantes();
    props.getUsuarioUcentrals();
    props.getProfesors();
    props.getDelegadoInstitucionals();
    props.getEvaluadors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...personaEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ucentralEventosApplicationApp.persona.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.persona.home.createOrEditLabel">Create or edit a Persona</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : personaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="persona-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="persona-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombresLabel" for="persona-nombres">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.nombres">Nombres</Translate>
                </Label>
                <AvField id="persona-nombres" type="text" name="nombres" />
              </AvGroup>
              <AvGroup>
                <Label id="apellidosLabel" for="persona-apellidos">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.apellidos">Apellidos</Translate>
                </Label>
                <AvField id="persona-apellidos" type="text" name="apellidos" />
              </AvGroup>
              <AvGroup>
                <Label id="numeroIdenficacionLabel" for="persona-numeroIdenficacion">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.numeroIdenficacion">Numero Idenficacion</Translate>
                </Label>
                <AvField id="persona-numeroIdenficacion" type="text" name="numeroIdenficacion" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="persona-email">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.email">Email</Translate>
                </Label>
                <AvField id="persona-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label for="persona-ciudad">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.ciudad">Ciudad</Translate>
                </Label>
                <AvInput id="persona-ciudad" type="select" className="form-control" name="ciudad.id">
                  <option value="" key="0" />
                  {ciudads
                    ? ciudads.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="persona-tipoIdentificacion">
                  <Translate contentKey="ucentralEventosApplicationApp.persona.tipoIdentificacion">Tipo Identificacion</Translate>
                </Label>
                <AvInput id="persona-tipoIdentificacion" type="select" className="form-control" name="tipoIdentificacion.id">
                  <option value="" key="0" />
                  {tipoIdentificacions
                    ? tipoIdentificacions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/persona" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ciudads: storeState.ciudad.entities,
  tipoIdentificacions: storeState.tipoIdentificacion.entities,
  estudiantes: storeState.estudiante.entities,
  usuarioUcentrals: storeState.usuarioUcentral.entities,
  profesors: storeState.profesor.entities,
  delegadoInstitucionals: storeState.delegadoInstitucional.entities,
  evaluadors: storeState.evaluador.entities,
  personaEntity: storeState.persona.entity,
  loading: storeState.persona.loading,
  updating: storeState.persona.updating,
  updateSuccess: storeState.persona.updateSuccess
});

const mapDispatchToProps = {
  getCiudads,
  getTipoIdentificacions,
  getEstudiantes,
  getUsuarioUcentrals,
  getProfesors,
  getDelegadoInstitucionals,
  getEvaluadors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonaUpdate);
