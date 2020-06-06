import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInstitucion } from 'app/shared/model/institucion.model';
import { getEntities as getInstitucions } from 'app/entities/institucion/institucion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './programa.reducer';
import { IPrograma } from 'app/shared/model/programa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProgramaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramaUpdate = (props: IProgramaUpdateProps) => {
  const [institucionId, setInstitucionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { programaEntity, institucions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/programa');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...programaEntity,
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
          <h2 id="ucentralEventosApplicationApp.programa.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.programa.home.createOrEditLabel">Create or edit a Programa</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : programaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="programa-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="programa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="programa-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.programa.nombre">Nombre</Translate>
                </Label>
                <AvField id="programa-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="descripcionLabel" for="programa-descripcion">
                  <Translate contentKey="ucentralEventosApplicationApp.programa.descripcion">Descripcion</Translate>
                </Label>
                <AvField id="programa-descripcion" type="text" name="descripcion" />
              </AvGroup>
              <AvGroup>
                <Label for="programa-institucion">
                  <Translate contentKey="ucentralEventosApplicationApp.programa.institucion">Institucion</Translate>
                </Label>
                <AvInput id="programa-institucion" type="select" className="form-control" name="institucion.id">
                  <option value="" key="0" />
                  {institucions
                    ? institucions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/programa" replace color="info">
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
  institucions: storeState.institucion.entities,
  programaEntity: storeState.programa.entity,
  loading: storeState.programa.loading,
  updating: storeState.programa.updating,
  updateSuccess: storeState.programa.updateSuccess
});

const mapDispatchToProps = {
  getInstitucions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramaUpdate);
