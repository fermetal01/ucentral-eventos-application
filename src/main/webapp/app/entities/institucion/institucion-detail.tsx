import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './institucion.reducer';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInstitucionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InstitucionDetail = (props: IInstitucionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { institucionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.institucion.detail.title">Institucion</Translate> [
          <b>{institucionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.institucion.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{institucionEntity.nombre}</dd>
          <dt>
            <span id="web">
              <Translate contentKey="ucentralEventosApplicationApp.institucion.web">Web</Translate>
            </span>
          </dt>
          <dd>{institucionEntity.web}</dd>
          <dt>
            <span id="fechaRegistro">
              <Translate contentKey="ucentralEventosApplicationApp.institucion.fechaRegistro">Fecha Registro</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={institucionEntity.fechaRegistro} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.institucion.ciudad">Ciudad</Translate>
          </dt>
          <dd>{institucionEntity.ciudad ? institucionEntity.ciudad.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.institucion.nodo">Nodo</Translate>
          </dt>
          <dd>{institucionEntity.nodo ? institucionEntity.nodo.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/institucion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/institucion/${institucionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ institucion }: IRootState) => ({
  institucionEntity: institucion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InstitucionDetail);
