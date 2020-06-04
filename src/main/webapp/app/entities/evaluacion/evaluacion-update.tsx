import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPonencia } from 'app/shared/model/ponencia.model';
import { getEntities as getPonencias } from 'app/entities/ponencia/ponencia.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { getEntities as getEvaluadors } from 'app/entities/evaluador/evaluador.reducer';
import { getEntity, updateEntity, createEntity, reset } from './evaluacion.reducer';
import { IEvaluacion } from 'app/shared/model/evaluacion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEvaluacionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EvaluacionUpdate = (props: IEvaluacionUpdateProps) => {
  const [ponenciaId, setPonenciaId] = useState('0');
  const [evaluadorId, setEvaluadorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { evaluacionEntity, ponencias, evaluadors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/evaluacion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPonencias();
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
        ...evaluacionEntity,
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
          <h2 id="ucentralEventosApplicationApp.evaluacion.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.evaluacion.home.createOrEditLabel">Create or edit a Evaluacion</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : evaluacionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="evaluacion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="evaluacion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="calificacionLabel" for="evaluacion-calificacion">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.calificacion">Calificacion</Translate>
                </Label>
                <AvField id="evaluacion-calificacion" type="string" className="form-control" name="calificacion" />
              </AvGroup>
              <AvGroup>
                <Label id="observacionesLabel" for="evaluacion-observaciones">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.observaciones">Observaciones</Translate>
                </Label>
                <AvField id="evaluacion-observaciones" type="text" name="observaciones" />
              </AvGroup>
              <AvGroup>
                <Label for="evaluacion-ponencia">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.ponencia">Ponencia</Translate>
                </Label>
                <AvInput id="evaluacion-ponencia" type="select" className="form-control" name="ponencia.id">
                  <option value="" key="0" />
                  {ponencias
                    ? ponencias.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id + " - " + otherEntity.proyecto.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="evaluacion-evaluador">
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.evaluador">Evaluador</Translate>
                </Label>
                <AvInput id="evaluacion-evaluador" type="select" className="form-control" name="evaluador.id">
                  <option value="" key="0" />
                  {evaluadors
                    ? evaluadors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.persona.nombres+" "+otherEntity.persona.apellidos}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/evaluacion" replace color="info">
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
  ponencias: storeState.ponencia.entities,
  evaluadors: storeState.evaluador.entities,
  evaluacionEntity: storeState.evaluacion.entity,
  loading: storeState.evaluacion.loading,
  updating: storeState.evaluacion.updating,
  updateSuccess: storeState.evaluacion.updateSuccess
});

const mapDispatchToProps = {
  getPonencias,
  getEvaluadors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EvaluacionUpdate);
