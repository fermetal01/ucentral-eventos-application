import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './usuario-ucentral.reducer';
import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsuarioUcentralDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UsuarioUcentralDetail = (props: IUsuarioUcentralDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { usuarioUcentralEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.detail.title">UsuarioUcentral</Translate> [
          <b>{usuarioUcentralEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="emailUcentral">
              <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.emailUcentral">Email Ucentral</Translate>
            </span>
          </dt>
          <dd>{usuarioUcentralEntity.emailUcentral}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.user">User</Translate>
          </dt>
          <dd>{usuarioUcentralEntity.user ? usuarioUcentralEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.persona">Persona</Translate>
          </dt>
          <dd>{usuarioUcentralEntity.persona ? usuarioUcentralEntity.persona.nombres+" "+usuarioUcentralEntity.persona.apellidos : ''}</dd>
        </dl>
        <Button tag={Link} to="/usuario-ucentral" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/usuario-ucentral/${usuarioUcentralEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ usuarioUcentral }: IRootState) => ({
  usuarioUcentralEntity: usuarioUcentral.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUcentralDetail);
