import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEvento } from 'app/shared/model/evento.model';
import { getEntities as getEventos } from 'app/entities/evento/evento.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { getEntities as getProyectos } from 'app/entities/proyecto/proyecto.reducer';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { getEntities as getDelegadoInstitucionals } from 'app/entities/delegado-institucional/delegado-institucional.reducer';
import { getEntity, updateEntity, createEntity, reset } from './inscripcion.reducer';
import { IInscripcion } from 'app/shared/model/inscripcion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInscripcionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InscripcionUpdate = (props: IInscripcionUpdateProps) => {
  const [eventoId, setEventoId] = useState('0');
  const [proyectoId, setProyectoId] = useState('0');
  const [delegadoId, setDelegadoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { inscripcionEntity, eventos, proyectos, delegadoInstitucionals, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/inscripcion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEventos();
    props.getProyectos();
    props.getDelegadoInstitucionals();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaRegistro = convertDateTimeToServer(values.fechaRegistro);

    if (errors.length === 0) {
      const entity = {
        ...inscripcionEntity,
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
          <h2 id="ucentralEventosApplicationApp.inscripcion.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.inscripcion.home.createOrEditLabel">
              Create or edit a Inscripcion
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : inscripcionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="inscripcion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="inscripcion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fechaRegistroLabel" for="inscripcion-fechaRegistro">
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.fechaRegistro">Fecha Registro</Translate>
                </Label>
                <AvInput
                  id="inscripcion-fechaRegistro"
                  type="datetime-local"
                  className="form-control"
                  name="fechaRegistro"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.inscripcionEntity.fechaRegistro)}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="aprobadoInstitucionLabel">
                  <AvInput id="inscripcion-aprobadoInstitucion" type="checkbox" className="form-check-input" name="aprobadoInstitucion" />
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoInstitucion">Aprobado Institucion</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="aprobadoEventoLabel">
                  <AvInput id="inscripcion-aprobadoEvento" type="checkbox" className="form-check-input" name="aprobadoEvento" />
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoEvento">Aprobado Evento</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="inscripcion-evento">
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.evento">Evento</Translate>
                </Label>
                <AvInput id="inscripcion-evento" type="select" className="form-control" name="evento.id">
                  <option value="" key="0" />
                  {eventos
                    ? eventos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="inscripcion-proyecto">
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.proyecto">Proyecto</Translate>
                </Label>
                <AvInput id="inscripcion-proyecto" type="select" className="form-control" name="proyecto.id">
                  <option value="" key="0" />
                  {proyectos
                    ? proyectos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="inscripcion-delegado">
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.delegado">Delegado</Translate>
                </Label>
                <AvInput id="inscripcion-delegado" type="select" className="form-control" name="delegado.id">
                  <option value="" key="0" />
                  {delegadoInstitucionals
                    ? delegadoInstitucionals.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/inscripcion" replace color="info">
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
  eventos: storeState.evento.entities,
  proyectos: storeState.proyecto.entities,
  delegadoInstitucionals: storeState.delegadoInstitucional.entities,
  inscripcionEntity: storeState.inscripcion.entity,
  loading: storeState.inscripcion.loading,
  updating: storeState.inscripcion.updating,
  updateSuccess: storeState.inscripcion.updateSuccess
});

const mapDispatchToProps = {
  getEventos,
  getProyectos,
  getDelegadoInstitucionals,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InscripcionUpdate);
