import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './evaluacion.reducer';
import { IEvaluacion } from 'app/shared/model/evaluacion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEvaluacionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Evaluacion = (props: IEvaluacionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { evaluacionList, match, loading } = props;
  return (
    <div>
      <h2 id="evaluacion-heading">
        <Translate contentKey="ucentralEventosApplicationApp.evaluacion.home.title">Evaluacions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.evaluacion.home.createLabel">Create new Evaluacion</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {evaluacionList && evaluacionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.calificacion">Calificacion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.observaciones">Observaciones</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.ponencia">Ponencia</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluacion.evaluador">Evaluador</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {evaluacionList.map((evaluacion, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${evaluacion.id}`} color="link" size="sm">
                      {evaluacion.id}
                    </Button>
                  </td>
                  <td>{evaluacion.calificacion}</td>
                  <td>{evaluacion.observaciones}</td>
                  <td>{evaluacion.ponencia ? <Link to={`ponencia/${evaluacion.ponencia.id}`}>{evaluacion.ponencia.id}</Link> : ''}</td>
                  <td>{evaluacion.evaluador ? <Link to={`evaluador/${evaluacion.evaluador.id}`}>{evaluacion.evaluador.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${evaluacion.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evaluacion.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evaluacion.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.evaluacion.home.notFound">No Evaluacions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ evaluacion }: IRootState) => ({
  evaluacionList: evaluacion.entities,
  loading: evaluacion.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Evaluacion);
