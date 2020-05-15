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
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { getEntities as getDelegadoInstitucionals } from 'app/entities/delegado-institucional/delegado-institucional.reducer';
import { getEntity, updateEntity, createEntity, reset } from './institucion.reducer';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInstitucionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InstitucionUpdate = (props: IInstitucionUpdateProps) => {
  const [ciudadId, setCiudadId] = useState('0');
  const [nodoId, setNodoId] = useState('0');
  const [delegadoInstitucionalId, setDelegadoInstitucionalId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { institucionEntity, ciudads, nodos, delegadoInstitucionals, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/institucion');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCiudads();
    props.getNodos();
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
        ...institucionEntity,
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
          <h2 id="ucentralEventosApplicationApp.institucion.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.institucion.home.createOrEditLabel">
              Create or edit a Institucion
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : institucionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="institucion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="institucion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="institucion-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.nombre">Nombre</Translate>
                </Label>
                <AvField id="institucion-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="webLabel" for="institucion-web">
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.web">Web</Translate>
                </Label>
                <AvField id="institucion-web" type="text" name="web" />
              </AvGroup>
              <AvGroup>
                <Label id="fechaRegistroLabel" for="institucion-fechaRegistro">
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.fechaRegistro">Fecha Registro</Translate>
                </Label>
                <AvInput
                  id="institucion-fechaRegistro"
                  type="datetime-local"
                  className="form-control"
                  name="fechaRegistro"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.institucionEntity.fechaRegistro)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="institucion-ciudad">
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.ciudad">Ciudad</Translate>
                </Label>
                <AvInput id="institucion-ciudad" type="select" className="form-control" name="ciudad.id">
                  <option value="" key="0" />
                  {ciudads
                    ? ciudads.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="institucion-nodo">
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.nodo">Nodo</Translate>
                </Label>
                <AvInput id="institucion-nodo" type="select" className="form-control" name="nodo.id">
                  <option value="" key="0" />
                  {nodos
                    ? nodos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/institucion" replace color="info">
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
  delegadoInstitucionals: storeState.delegadoInstitucional.entities,
  institucionEntity: storeState.institucion.entity,
  loading: storeState.institucion.loading,
  updating: storeState.institucion.updating,
  updateSuccess: storeState.institucion.updateSuccess
});

const mapDispatchToProps = {
  getCiudads,
  getNodos,
  getDelegadoInstitucionals,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InstitucionUpdate);
