import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEvento } from 'app/shared/model/evento.model';
import { getEntities as getEventos } from 'app/entities/evento/evento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './estadistica.reducer';
import { IEstadistica } from 'app/shared/model/estadistica.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEstadisticaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstadisticaUpdate = (props: IEstadisticaUpdateProps) => {
  const [idsevento, setIdsevento] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { estadisticaEntity, eventos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/estadistica');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...estadisticaEntity,
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
          <h2 id="ucentralEventosApplicationApp.estadistica.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.estadistica.home.createOrEditLabel">
              Create or edit a Estadistica
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : estadisticaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="estadistica-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="estadistica-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="estadistica-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.estadistica.nombre">Nombre</Translate>
                </Label>
                <AvField id="estadistica-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="llaveLabel" for="estadistica-llave">
                  <Translate contentKey="ucentralEventosApplicationApp.estadistica.llave">Llave</Translate>
                </Label>
                <AvField id="estadistica-llave" type="text" name="llave" />
              </AvGroup>
              <AvGroup>
                <Label id="valorLabel" for="estadistica-valor">
                  <Translate contentKey="ucentralEventosApplicationApp.estadistica.valor">Valor</Translate>
                </Label>
                <AvField id="estadistica-valor" type="text" name="valor" />
              </AvGroup>
              <AvGroup>
                <Label id="descripcionLabel" for="estadistica-descripcion">
                  <Translate contentKey="ucentralEventosApplicationApp.estadistica.descripcion">Descripcion</Translate>
                </Label>
                <AvField id="estadistica-descripcion" type="text" name="descripcion" />
              </AvGroup>
              <AvGroup>
                <Label for="estadistica-evento">
                  <Translate contentKey="ucentralEventosApplicationApp.estadistica.evento">Evento</Translate>
                </Label>
                <AvInput
                  id="estadistica-evento"
                  type="select"
                  multiple
                  className="form-control"
                  name="eventos"
                  value={estadisticaEntity.eventos && estadisticaEntity.eventos.map(e => e.id)}
                >
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
              <Button tag={Link} id="cancel-save" to="/estadistica" replace color="info">
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
  estadisticaEntity: storeState.estadistica.entity,
  loading: storeState.estadistica.loading,
  updating: storeState.estadistica.updating,
  updateSuccess: storeState.estadistica.updateSuccess
});

const mapDispatchToProps = {
  getEventos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstadisticaUpdate);
