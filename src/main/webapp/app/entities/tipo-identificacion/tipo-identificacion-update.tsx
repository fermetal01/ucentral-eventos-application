import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tipo-identificacion.reducer';
import { ITipoIdentificacion } from 'app/shared/model/tipo-identificacion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITipoIdentificacionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoIdentificacionUpdate = (props: ITipoIdentificacionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tipoIdentificacionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/tipo-identificacion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...tipoIdentificacionEntity,
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
          <h2 id="ucentralEventosApplicationApp.tipoIdentificacion.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.home.createOrEditLabel">
              Create or edit a TipoIdentificacion
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tipoIdentificacionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="tipo-identificacion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="tipo-identificacion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombresLabel" for="tipo-identificacion-nombres">
                  <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.nombres">Nombres</Translate>
                </Label>
                <AvField id="tipo-identificacion-nombres" type="text" name="nombres" />
              </AvGroup>
              <AvGroup>
                <Label id="codigoLabel" for="tipo-identificacion-codigo">
                  <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.codigo">Codigo</Translate>
                </Label>
                <AvField id="tipo-identificacion-codigo" type="text" name="codigo" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/tipo-identificacion" replace color="info">
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
  tipoIdentificacionEntity: storeState.tipoIdentificacion.entity,
  loading: storeState.tipoIdentificacion.loading,
  updating: storeState.tipoIdentificacion.updating,
  updateSuccess: storeState.tipoIdentificacion.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoIdentificacionUpdate);
