import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proyecto.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProyectoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProyectoDetail = (props: IProyectoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { proyectoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.proyecto.detail.title">Proyecto</Translate> [<b>{proyectoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.proyecto.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{proyectoEntity.nombre}</dd>
          <dt>
            <span id="fechaRegistro">
              <Translate contentKey="ucentralEventosApplicationApp.proyecto.fechaRegistro">Fecha Registro</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={proyectoEntity.fechaRegistro} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.proyecto.categoria">Categoria</Translate>
          </dt>
          <dd>{proyectoEntity.categoria ? proyectoEntity.categoria.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.proyecto.areaConocimiento">Area Conocimiento</Translate>
          </dt>
          <dd>{proyectoEntity.areaConocimiento ? proyectoEntity.areaConocimiento.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.proyecto.semillero">Semillero</Translate>
          </dt>
          <dd>{proyectoEntity.semillero ? proyectoEntity.semillero.institucion.nombre+" - "+proyectoEntity.semillero.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/proyecto" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proyecto/${proyectoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ proyecto }: IRootState) => ({
  proyectoEntity: proyecto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProyectoDetail);
