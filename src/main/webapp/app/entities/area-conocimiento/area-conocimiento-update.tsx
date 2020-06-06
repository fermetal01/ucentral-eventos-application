import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getAreaConocimientos } from 'app/entities/area-conocimiento/area-conocimiento.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { getEntities as getEventos } from 'app/entities/evento/evento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './area-conocimiento.reducer';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAreaConocimientoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaConocimientoUpdate = (props: IAreaConocimientoUpdateProps) => {
  const [padreId, setPadreId] = useState('0');
  const [eventoId, setEventoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { areaConocimientoEntity, areaConocimientos, eventos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/area-conocimiento');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAreaConocimientos();
    props.getEventos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...areaConocimientoEntity,
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
          <h2 id="ucentralEventosApplicationApp.areaConocimiento.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.home.createOrEditLabel">
              Create or edit a AreaConocimiento
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : areaConocimientoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="area-conocimiento-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="area-conocimiento-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="area-conocimiento-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.nombre">Nombre</Translate>
                </Label>
                <AvField id="area-conocimiento-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="descripcionLabel" for="area-conocimiento-descripcion">
                  <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.descripcion">Descripcion</Translate>
                </Label>
                <AvField id="area-conocimiento-descripcion" type="text" name="descripcion" />
              </AvGroup>
              <AvGroup>
                <Label for="area-conocimiento-padre">
                  <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.padre">Padre</Translate>
                </Label>
                <AvInput id="area-conocimiento-padre" type="select" className="form-control" name="padre.id">
                  <option value="" key="0" />
                  {areaConocimientos
                    ? areaConocimientos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/area-conocimiento" replace color="info">
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
  areaConocimientos: storeState.areaConocimiento.entities,
  eventos: storeState.evento.entities,
  areaConocimientoEntity: storeState.areaConocimiento.entity,
  loading: storeState.areaConocimiento.loading,
  updating: storeState.areaConocimiento.updating,
  updateSuccess: storeState.areaConocimiento.updateSuccess
});

const mapDispatchToProps = {
  getAreaConocimientos,
  getEventos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaConocimientoUpdate);
