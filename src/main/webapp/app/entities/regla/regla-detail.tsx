import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './regla.reducer';
import { IRegla } from 'app/shared/model/regla.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReglaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReglaDetail = (props: IReglaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reglaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.regla.detail.title">Regla</Translate> [<b>{reglaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.regla.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{reglaEntity.nombre}</dd>
          <dt>
            <span id="llave">
              <Translate contentKey="ucentralEventosApplicationApp.regla.llave">Llave</Translate>
            </span>
          </dt>
          <dd>{reglaEntity.llave}</dd>
          <dt>
            <span id="valor">
              <Translate contentKey="ucentralEventosApplicationApp.regla.valor">Valor</Translate>
            </span>
          </dt>
          <dd>{reglaEntity.valor}</dd>
          <dt>
            <span id="auxiliar">
              <Translate contentKey="ucentralEventosApplicationApp.regla.auxiliar">Auxiliar</Translate>
            </span>
          </dt>
          <dd>{reglaEntity.auxiliar}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.regla.evento">Evento</Translate>
          </dt>
          <dd>
            {reglaEntity.eventos
              ? reglaEntity.eventos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nombre}</a>
                    {i === reglaEntity.eventos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/regla" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/regla/${reglaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ regla }: IRootState) => ({
  reglaEntity: regla.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReglaDetail);
