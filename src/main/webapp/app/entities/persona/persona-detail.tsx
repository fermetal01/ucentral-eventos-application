import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './persona.reducer';
import { IPersona } from 'app/shared/model/persona.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PersonaDetail = (props: IPersonaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { personaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.persona.detail.title">Persona</Translate> [<b>{personaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombres">
              <Translate contentKey="ucentralEventosApplicationApp.persona.nombres">Nombres</Translate>
            </span>
          </dt>
          <dd>{personaEntity.nombres}</dd>
          <dt>
            <span id="apellidos">
              <Translate contentKey="ucentralEventosApplicationApp.persona.apellidos">Apellidos</Translate>
            </span>
          </dt>
          <dd>{personaEntity.apellidos}</dd>
          <dt>
            <span id="numeroIdenficacion">
              <Translate contentKey="ucentralEventosApplicationApp.persona.numeroIdenficacion">Numero Idenficacion</Translate>
            </span>
          </dt>
          <dd>{personaEntity.numeroIdenficacion}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ucentralEventosApplicationApp.persona.email">Email</Translate>
            </span>
          </dt>
          <dd>{personaEntity.email}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.persona.ciudad">Ciudad</Translate>
          </dt>
          <dd>{personaEntity.ciudad ? personaEntity.ciudad.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.persona.tipoIdentificacion">Tipo Identificacion</Translate>
          </dt>
          <dd>{personaEntity.tipoIdentificacion ? personaEntity.tipoIdentificacion.nombres : ''}</dd>
        </dl>
        <Button tag={Link} to="/persona" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/persona/${personaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ persona }: IRootState) => ({
  personaEntity: persona.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonaDetail);
