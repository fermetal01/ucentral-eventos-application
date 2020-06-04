import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICiudad } from 'app/shared/model/ciudad.model';
import { getEntities as getCiudads } from 'app/entities/ciudad/ciudad.reducer';
import { INodo } from 'app/shared/model/nodo.model';
import { getEntities as getNodos } from 'app/entities/nodo/nodo.reducer';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { getEntities as getAreaConocimientos } from 'app/entities/area-conocimiento/area-conocimiento.reducer';
import { IEstadistica } from 'app/shared/model/estadistica.model';
import { getEntities as getEstadisticas } from 'app/entities/estadistica/estadistica.reducer';
import { IArea } from 'app/shared/model/area.model';
import { getEntities as getAreas } from 'app/entities/area/area.reducer';
import { IRegla } from 'app/shared/model/regla.model';
import { getEntities as getReglas } from 'app/entities/regla/regla.reducer';
import { getEntity, updateEntity, createEntity, reset } from './evento.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventoUpdate = (props: IEventoUpdateProps) => {
  const [idsareaConocimiento, setIdsareaConocimiento] = useState([]);
  const [idsarea, setIdsarea] = useState([]);
  const [idsregla, setIdsregla] = useState([]);
  const [ciudadId, setCiudadId] = useState('0');
  const [nodoId, setNodoId] = useState('0');
  const [estadisticaId, setEstadisticaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { eventoEntity, ciudads, nodos, areaConocimientos, estadisticas, areas, reglas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/evento');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCiudads();
    props.getNodos();
    props.getAreaConocimientos();
    props.getEstadisticas();
    props.getAreas();
    props.getReglas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaInicio = convertDateTimeToServer(values.fechaInicio);
    values.fechaFin = convertDateTimeToServer(values.fechaFin);

    if (errors.length === 0) {
      const entity = {
        ...eventoEntity,
        ...values,
        areaConocimientos: mapIdList(values.areaConocimientos),
        areas: mapIdList(values.areas),
        reglas: mapIdList(values.reglas)
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
          <h2 id="ucentralEventosApplicationApp.evento.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.evento.home.createOrEditLabel">Create or edit a Evento</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : eventoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="evento-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="evento-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="evento-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.nombre">Nombre</Translate>
                </Label>
                <AvField id="evento-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="fechaInicioLabel" for="evento-fechaInicio">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.fechaInicio">Fecha Inicio</Translate>
                </Label>
                <AvInput
                  id="evento-fechaInicio"
                  type="datetime-local"
                  className="form-control"
                  name="fechaInicio"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.eventoEntity.fechaInicio)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fechaFinLabel" for="evento-fechaFin">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.fechaFin">Fecha Fin</Translate>
                </Label>
                <AvInput
                  id="evento-fechaFin"
                  type="datetime-local"
                  className="form-control"
                  name="fechaFin"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.eventoEntity.fechaFin)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ubicacionLabel" for="evento-ubicacion">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.ubicacion">Ubicacion</Translate>
                </Label>
                <AvField id="evento-ubicacion" type="text" name="ubicacion" />
              </AvGroup>
              <AvGroup>
                <Label for="evento-ciudad">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.ciudad">Ciudad</Translate>
                </Label>
                <AvInput id="evento-ciudad" type="select" className="form-control" name="ciudad.id">
                  <option value="" key="0" />
                  {ciudads
                    ? ciudads.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="evento-nodo">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.nodo">Nodo</Translate>
                </Label>
                <AvInput id="evento-nodo" type="select" className="form-control" name="nodo.id">
                  <option value="" key="0" />
                  {nodos
                    ? nodos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.nombre}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="evento-areaConocimiento">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.areaConocimiento">Area Conocimiento</Translate>
                </Label>
                <AvInput
                  id="evento-areaConocimiento"
                  type="select"
                  multiple
                  className="form-control"
                  name="areaConocimientos"
                  value={eventoEntity.areaConocimientos && eventoEntity.areaConocimientos.map(e => e.id)}
                >
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
              <AvGroup>
                <Label for="evento-area">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.area">Area</Translate>
                </Label>
                <AvInput
                  id="evento-area"
                  type="select"
                  multiple
                  className="form-control"
                  name="areas"
                  value={eventoEntity.areas && eventoEntity.areas.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {areas
                    ? areas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="evento-regla">
                  <Translate contentKey="ucentralEventosApplicationApp.evento.regla">Regla</Translate>
                </Label>
                <AvInput
                  id="evento-regla"
                  type="select"
                  multiple
                  className="form-control"
                  name="reglas"
                  value={eventoEntity.reglas && eventoEntity.reglas.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {reglas
                    ? reglas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/evento" replace color="info">
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
  ciudads: storeState.ciudad.entities,
  nodos: storeState.nodo.entities,
  areaConocimientos: storeState.areaConocimiento.entities,
  estadisticas: storeState.estadistica.entities,
  areas: storeState.area.entities,
  reglas: storeState.regla.entities,
  eventoEntity: storeState.evento.entity,
  loading: storeState.evento.loading,
  updating: storeState.evento.updating,
  updateSuccess: storeState.evento.updateSuccess
});

const mapDispatchToProps = {
  getCiudads,
  getNodos,
  getAreaConocimientos,
  getEstadisticas,
  getAreas,
  getReglas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventoUpdate);
