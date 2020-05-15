import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './programa.reducer';
import { IPrograma } from 'app/shared/model/programa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Programa = (props: IProgramaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { programaList, match, loading } = props;
  return (
    <div>
      <h2 id="programa-heading">
        <Translate contentKey="ucentralEventosApplicationApp.programa.home.title">Programas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.programa.home.createLabel">Create new Programa</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {programaList && programaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.programa.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.programa.descripcion">Descripcion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.programa.institucion">Institucion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {programaList.map((programa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${programa.id}`} color="link" size="sm">
                      {programa.id}
                    </Button>
                  </td>
                  <td>{programa.nombre}</td>
                  <td>{programa.descripcion}</td>
                  <td>
                    {programa.institucion ? <Link to={`institucion/${programa.institucion.id}`}>{programa.institucion.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${programa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${programa.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${programa.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.programa.home.notFound">No Programas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ programa }: IRootState) => ({
  programaList: programa.entities,
  loading: programa.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Programa);
