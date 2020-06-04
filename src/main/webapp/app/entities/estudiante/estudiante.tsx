import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './estudiante.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstudianteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Estudiante = (props: IEstudianteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { estudianteList, match, loading } = props;
  return (
    <div>
      <h2 id="estudiante-heading">
        <Translate contentKey="ucentralEventosApplicationApp.estudiante.home.title">Estudiantes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.estudiante.home.createLabel">Create new Estudiante</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {estudianteList && estudianteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.carrera">Carrera</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.persona">Persona</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.programa">Programa</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.estudiante.proyecto">Proyecto</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {estudianteList.map((estudiante, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${estudiante.id}`} color="link" size="sm">
                      {estudiante.id}
                    </Button>
                  </td>
                  <td>{estudiante.carrera}</td>
                  <td>{estudiante.persona ? <Link to={`persona/${estudiante.persona.id}`}>{estudiante.persona.nombres+" "+estudiante.persona.apellidos}</Link> : ''}</td>
                  <td>{estudiante.programa ? <Link to={`programa/${estudiante.programa.id}`}>{estudiante.programa.nombre}</Link> : ''}</td>
                  <td>
                    {estudiante.proyectos
                      ? estudiante.proyectos.map((val, j) => (
                          <span key={j}>
                            <Link to={`proyecto/${val.id}`}>{val.nombre}</Link>
                            {j === estudiante.proyectos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${estudiante.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${estudiante.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${estudiante.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.estudiante.home.notFound">No Estudiantes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ estudiante }: IRootState) => ({
  estudianteList: estudiante.entities,
  loading: estudiante.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Estudiante);
