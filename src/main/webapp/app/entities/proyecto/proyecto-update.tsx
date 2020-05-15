import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProyectoCategoria } from 'app/shared/model/proyecto-categoria.model';
import { getEntities as getProyectoCategorias } from 'app/entities/proyecto-categoria/proyecto-categoria.reducer';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { getEntities as getAreaConocimientos } from 'app/entities/area-conocimiento/area-conocimiento.reducer';
import { ISemillero } from 'app/shared/model/semillero.model';
import { getEntities as getSemilleros } from 'app/entities/semillero/semillero.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { getEntity, updateEntity, createEntity, reset } from './proyecto.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProyectoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProyectoUpdate = (props: IProyectoUpdateProps) => {
  const [categoriaId, setCategoriaId] = useState('0');
  const [areaConocimientoId, setAreaConocimientoId] = useState('0');
  const [semilleroId, setSemilleroId] = useState('0');
  const [estudianteId, setEstudianteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { proyectoEntity, proyectoCategorias, areaConocimientos, semilleros, estudiantes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/proyecto');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProyectoCategorias();
    props.getAreaConocimientos();
    props.getSemilleros();
    props.getEstudiantes();
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
        ...proyectoEntity,
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
          <h2 id="ucentralEventosApplicationApp.proyecto.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.proyecto.home.createOrEditLabel">Create or edit a Proyecto</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : proyectoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="proyecto-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="proyecto-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nombreLabel" for="proyecto-nombre">
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.nombre">Nombre</Translate>
                </Label>
                <AvField id="proyecto-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="fechaRegistroLabel" for="proyecto-fechaRegistro">
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.fechaRegistro">Fecha Registro</Translate>
                </Label>
                <AvInput
                  id="proyecto-fechaRegistro"
                  type="datetime-local"
                  className="form-control"
                  name="fechaRegistro"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.proyectoEntity.fechaRegistro)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="proyecto-categoria">
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.categoria">Categoria</Translate>
                </Label>
                <AvInput id="proyecto-categoria" type="select" className="form-control" name="categoria.id">
                  <option value="" key="0" />
                  {proyectoCategorias
                    ? proyectoCategorias.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="proyecto-areaConocimiento">
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.areaConocimiento">Area Conocimiento</Translate>
                </Label>
                <AvInput id="proyecto-areaConocimiento" type="select" className="form-control" name="areaConocimiento.id">
                  <option value="" key="0" />
                  {areaConocimientos
                    ? areaConocimientos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="proyecto-semillero">
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.semillero">Semillero</Translate>
                </Label>
                <AvInput id="proyecto-semillero" type="select" className="form-control" name="semillero.id">
                  <option value="" key="0" />
                  {semilleros
                    ? semilleros.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/proyecto" replace color="info">
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
  proyectoCategorias: storeState.proyectoCategoria.entities,
  areaConocimientos: storeState.areaConocimiento.entities,
  semilleros: storeState.semillero.entities,
  estudiantes: storeState.estudiante.entities,
  proyectoEntity: storeState.proyecto.entity,
  loading: storeState.proyecto.loading,
  updating: storeState.proyecto.updating,
  updateSuccess: storeState.proyecto.updateSuccess
});

const mapDispatchToProps = {
  getProyectoCategorias,
  getAreaConocimientos,
  getSemilleros,
  getEstudiantes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProyectoUpdate);
