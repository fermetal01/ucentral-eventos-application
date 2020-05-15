import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './programa.reducer';
import { IPrograma } from 'app/shared/model/programa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProgramaDetail = (props: IProgramaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { programaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.programa.detail.title">Programa</Translate> [<b>{programaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.programa.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{programaEntity.nombre}</dd>
          <dt>
            <span id="descripcion">
              <Translate contentKey="ucentralEventosApplicationApp.programa.descripcion">Descripcion</Translate>
            </span>
          </dt>
          <dd>{programaEntity.descripcion}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.programa.institucion">Institucion</Translate>
          </dt>
          <dd>{programaEntity.institucion ? programaEntity.institucion.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/programa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/programa/${programaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ programa }: IRootState) => ({
  programaEntity: programa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgramaDetail);
