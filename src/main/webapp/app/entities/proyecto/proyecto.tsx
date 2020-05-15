import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proyecto.reducer';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProyectoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Proyecto = (props: IProyectoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { proyectoList, match, loading } = props;
  return (
    <div>
      <h2 id="proyecto-heading">
        <Translate contentKey="ucentralEventosApplicationApp.proyecto.home.title">Proyectos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.proyecto.home.createLabel">Create new Proyecto</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {proyectoList && proyectoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.fechaRegistro">Fecha Registro</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.categoria">Categoria</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.areaConocimiento">Area Conocimiento</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.proyecto.semillero">Semillero</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proyectoList.map((proyecto, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proyecto.id}`} color="link" size="sm">
                      {proyecto.id}
                    </Button>
                  </td>
                  <td>{proyecto.nombre}</td>
                  <td>
                    <TextFormat type="date" value={proyecto.fechaRegistro} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {proyecto.categoria ? <Link to={`proyecto-categoria/${proyecto.categoria.id}`}>{proyecto.categoria.id}</Link> : ''}
                  </td>
                  <td>
                    {proyecto.areaConocimiento ? (
                      <Link to={`area-conocimiento/${proyecto.areaConocimiento.id}`}>{proyecto.areaConocimiento.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{proyecto.semillero ? <Link to={`semillero/${proyecto.semillero.id}`}>{proyecto.semillero.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proyecto.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proyecto.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proyecto.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.proyecto.home.notFound">No Proyectos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ proyecto }: IRootState) => ({
  proyectoList: proyecto.entities,
  loading: proyecto.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Proyecto);
