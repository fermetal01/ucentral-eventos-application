import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nodo.reducer';
import { INodo } from 'app/shared/model/nodo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INodoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NodoDetail = (props: INodoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { nodoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.nodo.detail.title">Nodo</Translate> [<b>{nodoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="codigo">
              <Translate contentKey="ucentralEventosApplicationApp.nodo.codigo">Codigo</Translate>
            </span>
          </dt>
          <dd>{nodoEntity.codigo}</dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.nodo.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{nodoEntity.nombre}</dd>
        </dl>
        <Button tag={Link} to="/nodo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/nodo/${nodoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ nodo }: IRootState) => ({
  nodoEntity: nodo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NodoDetail);
