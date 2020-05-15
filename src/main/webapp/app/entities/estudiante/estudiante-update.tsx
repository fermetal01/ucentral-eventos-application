import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPersona } from 'app/shared/model/persona.model';
import { getEntities as getPersonas } from 'app/entities/persona/persona.reducer';
import { IPrograma } from 'app/shared/model/programa.model';
import { getEntities as getProgramas } from 'app/entities/programa/programa.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { getEntities as getProyectos } from 'app/entities/proyecto/proyecto.reducer';
import { getEntity, updateEntity, createEntity, reset } from './estudiante.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEstudianteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstudianteUpdate = (props: IEstudianteUpdateProps) => {
  const [idsproyecto, setIdsproyecto] = useState([]);
  const [personaId, setPersonaId] = useState('0');
  const [programaId, setProgramaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { estudianteEntity, personas, programas, proyectos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/estudiante');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPersonas();
    props.getProgramas();
    props.getProyectos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...estudianteEntity,
        ...values,
        proyectos: mapIdList(values.proyectos)
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
          <h2 id="ucentralEventosApplicationApp.estudiante.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.estudiante.home.createOrEditLabel">Create or edit a Estudiante</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : estudianteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="estudiante-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="estudiante-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="carreraLabel" for="estudiante-carrera">
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.carrera">Carrera</Translate>
                </Label>
                <AvField id="estudiante-carrera" type="text" name="carrera" />
              </AvGroup>
              <AvGroup>
                <Label for="estudiante-persona">
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.persona">Persona</Translate>
                </Label>
                <AvInput id="estudiante-persona" type="select" className="form-control" name="persona.id">
                  <option value="" key="0" />
                  {personas
                    ? personas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="estudiante-programa">
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.programa">Programa</Translate>
                </Label>
                <AvInput id="estudiante-programa" type="select" className="form-control" name="programa.id">
                  <option value="" key="0" />
                  {programas
                    ? programas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="estudiante-proyecto">
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.proyecto">Proyecto</Translate>
                </Label>
                <AvInput
                  id="estudiante-proyecto"
                  type="select"
                  multiple
                  className="form-control"
                  name="proyectos"
                  value={estudianteEntity.proyectos && estudianteEntity.proyectos.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {proyectos
                    ? proyectos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/estudiante" replace color="info">
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
  personas: storeState.persona.entities,
  programas: storeState.programa.entities,
  proyectos: storeState.proyecto.entities,
  estudianteEntity: storeState.estudiante.entity,
  loading: storeState.estudiante.loading,
  updating: storeState.estudiante.updating,
  updateSuccess: storeState.estudiante.updateSuccess
});

const mapDispatchToProps = {
  getPersonas,
  getProgramas,
  getProyectos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstudianteUpdate);
