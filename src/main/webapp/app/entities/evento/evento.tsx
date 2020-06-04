import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './evento.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Evento = (props: IEventoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { eventoList, match, loading } = props;
  return (
    <div>
      <h2 id="evento-heading">
        <Translate contentKey="ucentralEventosApplicationApp.evento.home.title">Eventos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.evento.home.createLabel">Create new Evento</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {eventoList && eventoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.fechaInicio">Fecha Inicio</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.fechaFin">Fecha Fin</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.ubicacion">Ubicacion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.ciudad">Ciudad</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.nodo">Nodo</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.evento.areaConocimiento">Area Conocimiento</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventoList.map((evento, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${evento.id}`} color="link" size="sm">
                      {evento.id}
                    </Button>
                  </td>
                  <td>{evento.nombre}</td>
                  <td>
                    <TextFormat type="date" value={evento.fechaInicio} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={evento.fechaFin} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{evento.ubicacion}</td>
                  <td>{evento.ciudad ? <Link to={`ciudad/${evento.ciudad.id}`}>{evento.ciudad.nombre}</Link> : ''}</td>
                  <td>{evento.nodo ? <Link to={`nodo/${evento.nodo.id}`}>{evento.nodo.nombre}</Link> : ''}</td>
                  <td>
                    {evento.areaConocimientos
                      ? evento.areaConocimientos.map((val, j) => (
                          <span key={j}>
                            <Link to={`area-conocimiento/${val.id}`}>{val.nombre}</Link>
                            {j === evento.areaConocimientos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${evento.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evento.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${evento.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.evento.home.notFound">No Eventos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ evento }: IRootState) => ({
  eventoList: evento.entities,
  loading: evento.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Evento);
