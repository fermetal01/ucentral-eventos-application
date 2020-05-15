import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proyecto-categoria.reducer';
import { IProyectoCategoria } from 'app/shared/model/proyecto-categoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProyectoCategoriaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProyectoCategoriaDetail = (props: IProyectoCategoriaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { proyectoCategoriaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.proyectoCategoria.detail.title">ProyectoCategoria</Translate> [
          <b>{proyectoCategoriaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.proyectoCategoria.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{proyectoCategoriaEntity.nombre}</dd>
        </dl>
        <Button tag={Link} to="/proyecto-categoria" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/proyecto-categoria/${proyectoCategoriaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ proyectoCategoria }: IRootState) => ({
  proyectoCategoriaEntity: proyectoCategoria.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProyectoCategoriaDetail);
