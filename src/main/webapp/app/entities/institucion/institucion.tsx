import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './institucion.reducer';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInstitucionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Institucion = (props: IInstitucionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { institucionList, match, loading } = props;
  return (
    <div>
      <h2 id="institucion-heading">
        <Translate contentKey="ucentralEventosApplicationApp.institucion.home.title">Institucions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.institucion.home.createLabel">Create new Institucion</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {institucionList && institucionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.web">Web</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.fechaRegistro">Fecha Registro</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.ciudad">Ciudad</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.nodo">Nodo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {institucionList.map((institucion, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${institucion.id}`} color="link" size="sm">
                      {institucion.id}
                    </Button>
                  </td>
                  <td>{institucion.nombre}</td>
                  <td>{institucion.web}</td>
                  <td>
                    <TextFormat type="date" value={institucion.fechaRegistro} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{institucion.ciudad ? <Link to={`ciudad/${institucion.ciudad.id}`}>{institucion.ciudad.id}</Link> : ''}</td>
                  <td>{institucion.nodo ? <Link to={`nodo/${institucion.nodo.id}`}>{institucion.nodo.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${institucion.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${institucion.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${institucion.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.institucion.home.notFound">No Institucions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ institucion }: IRootState) => ({
  institucionList: institucion.entities,
  loading: institucion.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Institucion);
