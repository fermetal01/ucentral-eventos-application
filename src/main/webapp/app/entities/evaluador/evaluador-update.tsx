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
import { IPonencia } from 'app/shared/model/ponencia.model';
import { getEntities as getPonencias } from 'app/entities/ponencia/ponencia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './evaluador.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEvaluadorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EvaluadorUpdate = (props: IEvaluadorUpdateProps) => {
  const [personaId, setPersonaId] = useState('0');
  const [ponenciaId, setPonenciaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { evaluadorEntity, personas, ponencias, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/evaluador');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPersonas();
    props.getPonencias();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...evaluadorEntity,
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
          <h2 id="ucentralEventosApplicationApp.evaluador.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.evaluador.home.createOrEditLabel">Create or edit a Evaluador</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : evaluadorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="evaluador-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="evaluador-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codigoLabel" for="evaluador-codigo">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.codigo">Codigo</Translate>
                </Label>
                <AvField id="evaluador-codigo" type="text" name="codigo" />
              </AvGroup>
              <AvGroup check>
                <Label id="activoLabel">
                  <AvInput id="evaluador-activo" type="checkbox" className="form-check-input" name="activo" />
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.activo">Activo</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="evaluador-persona">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.persona">Persona</Translate>
                </Label>
                <AvInput id="evaluador-persona" type="select" className="form-control" name="persona.id">
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
              <Button tag={Link} id="cancel-save" to="/evaluador" replace color="info">
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
  ponencias: storeState.ponencia.entities,
  evaluadorEntity: storeState.evaluador.entity,
  loading: storeState.evaluador.loading,
  updating: storeState.evaluador.updating,
  updateSuccess: storeState.evaluador.updateSuccess
});

const mapDispatchToProps = {
  getPersonas,
  getPonencias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EvaluadorUpdate);
