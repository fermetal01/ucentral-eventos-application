import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './semillero.reducer';
import { ISemillero } from 'app/shared/model/semillero.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISemilleroProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Semillero = (props: ISemilleroProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { semilleroList, match, loading } = props;
  return (
    <div>
      <h2 id="semillero-heading">
        <Translate contentKey="ucentralEventosApplicationApp.semillero.home.title">Semilleros</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.semillero.home.createLabel">Create new Semillero</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {semilleroList && semilleroList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.profesor">Profesor</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.institucion">Institucion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {semilleroList.map((semillero, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${semillero.id}`} color="link" size="sm">
                      {semillero.id}
                    </Button>
                  </td>
                  <td>{semillero.nombre}</td>
                  <td>{semillero.profesor ? <Link to={`profesor/${semillero.profesor.id}`}>{semillero.profesor.persona.nombres+" "+semillero.profesor.persona.apellidos}</Link> : ''}</td>
                  <td>
                    {semillero.institucion ? <Link to={`institucion/${semillero.institucion.id}`}>{semillero.institucion.nombre}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${semillero.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${semillero.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${semillero.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.semillero.home.notFound">No Semilleros found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ semillero }: IRootState) => ({
  semilleroList: semillero.entities,
  loading: semillero.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Semillero);
