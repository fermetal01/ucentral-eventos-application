import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Area = (props: IAreaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { areaList, match, loading } = props;
  return (
    <div>
      <h2 id="area-heading">
        <Translate contentKey="ucentralEventosApplicationApp.area.home.title">Areas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.area.home.createLabel">Create new Area</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {areaList && areaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.area.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.area.capacidad">Capacidad</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.area.ubicacion">Ubicacion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.area.tipoArea">Tipo Area</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.area.evento">Evento</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {areaList.map((area, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${area.id}`} color="link" size="sm">
                      {area.id}
                    </Button>
                  </td>
                  <td>{area.nombre}</td>
                  <td>{area.capacidad}</td>
                  <td>{area.ubicacion}</td>
                  <td>{area.tipoArea ? <Link to={`tipo-area/${area.tipoArea.id}`}>{area.tipoArea.id}</Link> : ''}</td>
                  <td>
                    {area.eventos
                      ? area.eventos.map((val, j) => (
                          <span key={j}>
                            <Link to={`evento/${val.id}`}>{val.id}</Link>
                            {j === area.eventos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${area.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${area.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${area.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.area.home.notFound">No Areas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ area }: IRootState) => ({
  areaList: area.entities,
  loading: area.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Area);
