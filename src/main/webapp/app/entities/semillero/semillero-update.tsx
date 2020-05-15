import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProfesor } from 'app/shared/model/profesor.model';
import { getEntities as getProfesors } from 'app/entities/profesor/profesor.reducer';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { getEntities as getInstitucions } from 'app/entities/institucion/institucion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './semillero.reducer';
import { ISemillero } from 'app/shared/model/semillero.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISemilleroUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SemilleroUpdate = (props: ISemilleroUpdateProps) => {
  const [profesorId, setProfesorId] = useState('0');
  const [institucionId, setInstitucionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { semilleroEntity, profesors, institucions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/semillero');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProfesors();
    props.getInstitucions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...semilleroEntity,
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
          <h2 id="ucentralEventosApplicationApp.semillero.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.semillero.home.createOrEditLabel">Create or edit a Semillero</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : semilleroEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="semillero-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="semillero-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="semillero-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.nombre">Nombre</Translate>
                </Label>
                <AvField id="semillero-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label for="semillero-profesor">
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.profesor">Profesor</Translate>
                </Label>
                <AvInput id="semillero-profesor" type="select" className="form-control" name="profesor.id">
                  <option value="" key="0" />
                  {profesors
                    ? profesors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="semillero-institucion">
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.institucion">Institucion</Translate>
                </Label>
                <AvInput id="semillero-institucion" type="select" className="form-control" name="institucion.id">
                  <option value="" key="0" />
                  {institucions
                    ? institucions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/semillero" replace color="info">
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
  profesors: storeState.profesor.entities,
  institucions: storeState.institucion.entities,
  semilleroEntity: storeState.semillero.entity,
  loading: storeState.semillero.loading,
  updating: storeState.semillero.updating,
  updateSuccess: storeState.semillero.updateSuccess
});

const mapDispatchToProps = {
  getProfesors,
  getInstitucions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SemilleroUpdate);
