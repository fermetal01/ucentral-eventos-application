import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IArea } from 'app/shared/model/area.model';
import { getEntities as getAreas } from 'app/entities/area/area.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { getEntities as getEventos } from 'app/entities/evento/evento.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { getEntities as getProyectos } from 'app/entities/proyecto/proyecto.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { getEntities as getEvaluadors } from 'app/entities/evaluador/evaluador.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ponencia.reducer';
import { IPonencia } from 'app/shared/model/ponencia.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPonenciaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PonenciaUpdate = (props: IPonenciaUpdateProps) => {
  const [idsevaluador, setIdsevaluador] = useState([]);
  const [areaId, setAreaId] = useState('0');
  const [eventoId, setEventoId] = useState('0');
  const [proyectoId, setProyectoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ponenciaEntity, areas, eventos, proyectos, evaluadors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ponencia');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAreas();
    props.getEventos();
    props.getProyectos();
    props.getEvaluadors();
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
        ...ponenciaEntity,
        ...values,
        evaluadors: mapIdList(values.evaluadors)
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
          <h2 id="ucentralEventosApplicationApp.ponencia.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.home.createOrEditLabel">Create or edit a Ponencia</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ponenciaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ponencia-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ponencia-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fechaInicioLabel" for="ponencia-fechaInicio">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaInicio">Fecha Inicio</Translate>
                </Label>
                <AvInput
                  id="ponencia-fechaInicio"
                  type="datetime-local"
                  className="form-control"
                  name="fechaInicio"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ponenciaEntity.fechaInicio)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fechaFinLabel" for="ponencia-fechaFin">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaFin">Fecha Fin</Translate>
                </Label>
                <AvInput
                  id="ponencia-fechaFin"
                  type="datetime-local"
                  className="form-control"
                  name="fechaFin"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ponenciaEntity.fechaFin)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="ponencia-area">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.area">Area</Translate>
                </Label>
                <AvInput id="ponencia-area" type="select" className="form-control" name="area.id">
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
                <Label for="ponencia-evento">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.evento">Evento</Translate>
                </Label>
                <AvInput id="ponencia-evento" type="select" className="form-control" name="evento.id">
                  <option value="" key="0" />
                  {eventos
                    ? eventos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ponencia-proyecto">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.proyecto">Proyecto</Translate>
                </Label>
                <AvInput id="ponencia-proyecto" type="select" className="form-control" name="proyecto.id">
                  <option value="" key="0" />
                  {proyectos
                    ? proyectos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.semillero.institucion.nombre + " - " + otherEntity.semillero.nombre + " - " +otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="ponencia-evaluador">
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.evaluador">Evaluador</Translate>
                </Label>
                <AvInput
                  id="ponencia-evaluador"
                  type="select"
                  multiple
                  className="form-control"
                  name="evaluadors"
                  value={ponenciaEntity.evaluadors && ponenciaEntity.evaluadors.map(e => e.id)}
                >
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
              <Button tag={Link} id="cancel-save" to="/ponencia" replace color="info">
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
  areas: storeState.area.entities,
  eventos: storeState.evento.entities,
  proyectos: storeState.proyecto.entities,
  evaluadors: storeState.evaluador.entities,
  ponenciaEntity: storeState.ponencia.entity,
  loading: storeState.ponencia.loading,
  updating: storeState.ponencia.updating,
  updateSuccess: storeState.ponencia.updateSuccess
});

const mapDispatchToProps = {
  getAreas,
  getEventos,
  getProyectos,
  getEvaluadors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PonenciaUpdate);
