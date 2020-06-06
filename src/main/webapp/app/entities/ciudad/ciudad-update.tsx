import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepartamento } from 'app/shared/model/departamento.model';
import { getEntities as getDepartamentos } from 'app/entities/departamento/departamento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ciudad.reducer';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICiudadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CiudadUpdate = (props: ICiudadUpdateProps) => {
  const [departamentoId, setDepartamentoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ciudadEntity, departamentos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ciudad');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDepartamentos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ciudadEntity,
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
          <h2 id="ucentralEventosApplicationApp.ciudad.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.ciudad.home.createOrEditLabel">Create or edit a Ciudad</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ciudadEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ciudad-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ciudad-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="ciudad-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.ciudad.nombre">Nombre</Translate>
                </Label>
                <AvField id="ciudad-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label for="ciudad-departamento">
                  <Translate contentKey="ucentralEventosApplicationApp.ciudad.departamento">Departamento</Translate>
                </Label>
                <AvInput id="ciudad-departamento" type="select" className="form-control" name="departamento.id">
                  <option value="" key="0" />
                  {departamentos
                    ? departamentos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ciudad" replace color="info">
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
  departamentos: storeState.departamento.entities,
  ciudadEntity: storeState.ciudad.entity,
  loading: storeState.ciudad.loading,
  updating: storeState.ciudad.updating,
  updateSuccess: storeState.ciudad.updateSuccess
});

const mapDispatchToProps = {
  getDepartamentos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CiudadUpdate);
