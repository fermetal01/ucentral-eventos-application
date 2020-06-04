import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITipoArea } from 'app/shared/model/tipo-area.model';
import { getEntities as getTipoAreas } from 'app/entities/tipo-area/tipo-area.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { getEntities as getEventos } from 'app/entities/evento/evento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAreaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaUpdate = (props: IAreaUpdateProps) => {
  const [idsevento, setIdsevento] = useState([]);
  const [tipoAreaId, setTipoAreaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { areaEntity, tipoAreas, eventos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/area');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTipoAreas();
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
        ...areaEntity,
        ...values,
        eventos: mapIdList(values.eventos)
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
          <h2 id="ucentralEventosApplicationApp.area.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.area.home.createOrEditLabel">Create or edit a Area</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : areaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="area-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="area-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="area-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.area.nombre">Nombre</Translate>
                </Label>
                <AvField id="area-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="capacidadLabel" for="area-capacidad">
                  <Translate contentKey="ucentralEventosApplicationApp.area.capacidad">Capacidad</Translate>
                </Label>
                <AvField id="area-capacidad" type="string" className="form-control" name="capacidad" />
              </AvGroup>
              <AvGroup>
                <Label id="ubicacionLabel" for="area-ubicacion">
                  <Translate contentKey="ucentralEventosApplicationApp.area.ubicacion">Ubicacion</Translate>
                </Label>
                <AvField id="area-ubicacion" type="text" name="ubicacion" />
              </AvGroup>
              <AvGroup>
                <Label for="area-tipoArea">
                  <Translate contentKey="ucentralEventosApplicationApp.area.tipoArea">Tipo Area</Translate>
                </Label>
                <AvInput id="area-tipoArea" type="select" className="form-control" name="tipoArea.id">
                  <option value="" key="0" />
                  {tipoAreas
                    ? tipoAreas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.nombre}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="area-evento">
                  <Translate contentKey="ucentralEventosApplicationApp.area.evento">Evento</Translate>
                </Label>
                <AvInput
                  id="area-evento"
                  type="select"
                  multiple
                  className="form-control"
                  name="eventos"
                  value={areaEntity.eventos && areaEntity.eventos.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {eventos
                    ? eventos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.nombre}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/area" replace color="info">
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
  tipoAreas: storeState.tipoArea.entities,
  eventos: storeState.evento.entities,
  areaEntity: storeState.area.entity,
  loading: storeState.area.loading,
  updating: storeState.area.updating,
  updateSuccess: storeState.area.updateSuccess
});

const mapDispatchToProps = {
  getTipoAreas,
  getEventos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaUpdate);
