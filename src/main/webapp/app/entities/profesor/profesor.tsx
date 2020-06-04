import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './profesor.reducer';
import { IProfesor } from 'app/shared/model/profesor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfesorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Profesor = (props: IProfesorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { profesorList, match, loading } = props;
  return (
    <div>
      <h2 id="profesor-heading">
        <Translate contentKey="ucentralEventosApplicationApp.profesor.home.title">Profesors</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.profesor.home.createLabel">Create new Profesor</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {profesorList && profesorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.profesor.area">Area</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.profesor.persona">Persona</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {profesorList.map((profesor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${profesor.id}`} color="link" size="sm">
                      {profesor.id}
                    </Button>
                  </td>
                  <td>{profesor.area}</td>
                  <td>{profesor.persona ? <Link to={`persona/${profesor.persona.id}`}>{profesor.persona.nombres+" "+profesor.persona.apellidos}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${profesor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${profesor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${profesor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.profesor.home.notFound">No Profesors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ profesor }: IRootState) => ({
  profesorList: profesor.entities,
  loading: profesor.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profesor);
