import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ciudad.reducer';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICiudadDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CiudadDetail = (props: ICiudadDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ciudadEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.ciudad.detail.title">Ciudad</Translate> [<b>{ciudadEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.ciudad.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{ciudadEntity.nombre}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.ciudad.departamento">Departamento</Translate>
          </dt>
          <dd>{ciudadEntity.departamento ? ciudadEntity.departamento.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/ciudad" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ciudad/${ciudadEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ciudad }: IRootState) => ({
  ciudadEntity: ciudad.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CiudadDetail);
