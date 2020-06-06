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
import { getEntity, updateEntity, createEntity, reset } from './regla.reducer';
import { IRegla } from 'app/shared/model/regla.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReglaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReglaUpdate = (props: IReglaUpdateProps) => {
  const [idsevento, setIdsevento] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { reglaEntity, eventos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/regla');
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
        ...reglaEntity,
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
          <h2 id="ucentralEventosApplicationApp.regla.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.regla.home.createOrEditLabel">Create or edit a Regla</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reglaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="regla-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="regla-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="regla-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.regla.nombre">Nombre</Translate>
                </Label>
                <AvField id="regla-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="llaveLabel" for="regla-llave">
                  <Translate contentKey="ucentralEventosApplicationApp.regla.llave">Llave</Translate>
                </Label>
                <AvField id="regla-llave" type="text" name="llave" />
              </AvGroup>
              <AvGroup>
                <Label id="valorLabel" for="regla-valor">
                  <Translate contentKey="ucentralEventosApplicationApp.regla.valor">Valor</Translate>
                </Label>
                <AvField id="regla-valor" type="text" name="valor" />
              </AvGroup>
              <AvGroup>
                <Label id="auxiliarLabel" for="regla-auxiliar">
                  <Translate contentKey="ucentralEventosApplicationApp.regla.auxiliar">Auxiliar</Translate>
                </Label>
                <AvField id="regla-auxiliar" type="text" name="auxiliar" />
              </AvGroup>
              <AvGroup>
                <Label for="regla-evento">
                  <Translate contentKey="ucentralEventosApplicationApp.regla.evento">Evento</Translate>
                </Label>
                <AvInput
                  id="regla-evento"
                  type="select"
                  multiple
                  className="form-control"
                  name="eventos"
                  value={reglaEntity.eventos && reglaEntity.eventos.map(e => e.id)}
                >
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
              <Button tag={Link} id="cancel-save" to="/regla" replace color="info">
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
  reglaEntity: storeState.regla.entity,
  loading: storeState.regla.loading,
  updating: storeState.regla.updating,
  updateSuccess: storeState.regla.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(ReglaUpdate);
