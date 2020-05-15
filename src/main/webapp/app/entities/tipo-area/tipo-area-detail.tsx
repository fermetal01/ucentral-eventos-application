import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tipo-area.reducer';
import { ITipoArea } from 'app/shared/model/tipo-area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoAreaDetail = (props: ITipoAreaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tipoAreaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.tipoArea.detail.title">TipoArea</Translate> [<b>{tipoAreaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.tipoArea.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{tipoAreaEntity.nombre}</dd>
        </dl>
        <Button tag={Link} to="/tipo-area" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tipo-area/${tipoAreaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tipoArea }: IRootState) => ({
  tipoAreaEntity: tipoArea.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoAreaDetail);
