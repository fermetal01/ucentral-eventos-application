import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './semillero.reducer';
import { ISemillero } from 'app/shared/model/semillero.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISemilleroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SemilleroDetail = (props: ISemilleroDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { semilleroEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.semillero.detail.title">Semillero</Translate> [<b>{semilleroEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.semillero.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{semilleroEntity.nombre}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.semillero.profesor">Profesor</Translate>
          </dt>
          <dd>{semilleroEntity.profesor ? semilleroEntity.profesor.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.semillero.institucion">Institucion</Translate>
          </dt>
          <dd>{semilleroEntity.institucion ? semilleroEntity.institucion.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/semillero" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/semillero/${semilleroEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ semillero }: IRootState) => ({
  semilleroEntity: semillero.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SemilleroDetail);
