import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ponencia.reducer';
import { IPonencia } from 'app/shared/model/ponencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPonenciaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Ponencia = (props: IPonenciaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { ponenciaList, match, loading } = props;
  return (
    <div>
      <h2 id="ponencia-heading">
        <Translate contentKey="ucentralEventosApplicationApp.ponencia.home.title">Ponencias</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.ponencia.home.createLabel">Create new Ponencia</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {ponenciaList && ponenciaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaInicio">Fecha Inicio</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaFin">Fecha Fin</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.area">Area</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.evento">Evento</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.proyecto">Proyecto</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.ponencia.evaluador">Evaluador</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ponenciaList.map((ponencia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${ponencia.id}`} color="link" size="sm">
                      {ponencia.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={ponencia.fechaInicio} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={ponencia.fechaFin} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{ponencia.area ? <Link to={`area/${ponencia.area.id}`}>{ponencia.area.nombre+" - "+ponencia.area.ubicacion+" - "+ponencia.area.tipoArea.nombre}</Link> : ''}</td>
                  <td>{ponencia.evento ? <Link to={`evento/${ponencia.evento.id}`}>{ponencia.evento.nombre}</Link> : ''}</td>
                  <td>{ponencia.proyecto ? <Link to={`proyecto/${ponencia.proyecto.id}`}>{ponencia.proyecto.nombre}</Link> : ''}</td>
                  <td>
                    {ponencia.evaluadors
                      ? ponencia.evaluadors.map((val, j) => (
                          <span key={j}>
                            <Link to={`evaluador/${val.id}`}>{val.persona.nombres+" "+val.persona.apellidos}</Link>
                            {j === ponencia.evaluadors.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${ponencia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ponencia.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${ponencia.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.ponencia.home.notFound">No Ponencias found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ ponencia }: IRootState) => ({
  ponenciaList: ponencia.entities,
  loading: ponencia.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Ponencia);
