import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './usuario-ucentral.reducer';
import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsuarioUcentralProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UsuarioUcentral = (props: IUsuarioUcentralProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { usuarioUcentralList, match, loading } = props;
  return (
    <div>
      <h2 id="usuario-ucentral-heading">
        <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.home.title">Usuario Ucentrals</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.home.createLabel">Create new Usuario Ucentral</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {usuarioUcentralList && usuarioUcentralList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.emailUcentral">Email Ucentral</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.persona">Persona</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {usuarioUcentralList.map((usuarioUcentral, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${usuarioUcentral.id}`} color="link" size="sm">
                      {usuarioUcentral.id}
                    </Button>
                  </td>
                  <td>{usuarioUcentral.emailUcentral}</td>
                  <td>{usuarioUcentral.user ? usuarioUcentral.user.id : ''}</td>
                  <td>
                    {usuarioUcentral.persona ? <Link to={`persona/${usuarioUcentral.persona.id}`}>{usuarioUcentral.persona.nombres+" "+usuarioUcentral.persona.apellidos}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${usuarioUcentral.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${usuarioUcentral.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${usuarioUcentral.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.home.notFound">No Usuario Ucentrals found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ usuarioUcentral }: IRootState) => ({
  usuarioUcentralList: usuarioUcentral.entities,
  loading: usuarioUcentral.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUcentral);
