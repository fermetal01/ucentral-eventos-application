import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './evaluador.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEvaluadorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Evaluador = (props: IEvaluadorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { evaluadorList, match, loading } = props;
  return (
    <div>
      <h2 id="evaluador-heading">
        <Translate contentKey="ucentralEventosApplicationApp.evaluador.home.title">Evaluadors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.evaluador.home.createLabel">Create new Evaluador</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {evaluadorList && evaluadorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.codigo">Codigo</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.activo">Activo</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evaluador.persona">Persona</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {evaluadorList.map((evaluador, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${evaluador.id}`} color="link" size="sm">
                      {evaluador.id}
                    </Button>
                  </td>
                  <td>{evaluador.codigo}</td>
                  <td>{evaluador.activo ? 'true' : 'false'}</td>
                  <td>{evaluador.persona ? <Link to={`persona/${evaluador.persona.id}`}>{evaluador.persona.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${evaluador.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evaluador.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evaluador.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.evaluador.home.notFound">No Evaluadors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ evaluador }: IRootState) => ({
  evaluadorList: evaluador.entities,
  loading: evaluador.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Evaluador);
