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
import { ISemillero } from 'app/shared/model/semillero.model';
import { getEntities as getSemilleros } from 'app/entities/semillero/semillero.reducer';
import { getEntity, updateEntity, createEntity, reset } from './profesor.reducer';
import { IProfesor } from 'app/shared/model/profesor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfesorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfesorUpdate = (props: IProfesorUpdateProps) => {
  const [personaId, setPersonaId] = useState('0');
  const [semilleroId, setSemilleroId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { profesorEntity, personas, semilleros, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/profesor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPersonas();
    props.getSemilleros();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...profesorEntity,
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
          <h2 id="ucentralEventosApplicationApp.profesor.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.profesor.home.createOrEditLabel">Create or edit a Profesor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : profesorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="profesor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="profesor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="areaLabel" for="profesor-area">
                  <Translate contentKey="ucentralEventosApplicationApp.profesor.area">Area</Translate>
                </Label>
                <AvField id="profesor-area" type="text" name="area" />
              </AvGroup>
              <AvGroup>
                <Label for="profesor-persona">
                  <Translate contentKey="ucentralEventosApplicationApp.profesor.persona">Persona</Translate>
                </Label>
                <AvInput id="profesor-persona" type="select" className="form-control" name="persona.id">
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
              <Button tag={Link} id="cancel-save" to="/profesor" replace color="info">
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
  semilleros: storeState.semillero.entities,
  profesorEntity: storeState.profesor.entity,
  loading: storeState.profesor.loading,
  updating: storeState.profesor.updating,
  updateSuccess: storeState.profesor.updateSuccess
});

const mapDispatchToProps = {
  getPersonas,
  getSemilleros,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfesorUpdate);
