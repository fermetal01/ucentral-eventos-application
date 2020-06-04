import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './inscripcion.reducer';
import { IInscripcion } from 'app/shared/model/inscripcion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInscripcionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Inscripcion = (props: IInscripcionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { inscripcionList, match, loading } = props;
  return (
    <div>
      <h2 id="inscripcion-heading">
        <Translate contentKey="ucentralEventosApplicationApp.inscripcion.home.title">Inscripcions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.inscripcion.home.createLabel">Create new Inscripcion</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {inscripcionList && inscripcionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.fechaRegistro">Fecha Registro</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoInstitucion">Aprobado Institucion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoEvento">Aprobado Evento</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.evento">Evento</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.proyecto">Proyecto</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.institucion.nombre">Institucion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.semillero.nombre">Semillero</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.inscripcion.delegado">Delegado</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {inscripcionList.map((inscripcion, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${inscripcion.id}`} color="link" size="sm">
                      {inscripcion.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={inscripcion.fechaRegistro} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{inscripcion.aprobadoInstitucion ? 'true' : 'false'}</td>
                  <td>{inscripcion.aprobadoEvento ? 'true' : 'false'}</td>
                  <td>{inscripcion.evento ? <Link to={`evento/${inscripcion.evento.id}`}>{inscripcion.evento.nombre}</Link> : ''}</td>
                  <td>{inscripcion.proyecto ? <Link to={`proyecto/${inscripcion.proyecto.id}`}>{inscripcion.proyecto.nombre+" - "+inscripcion.proyecto.semillero.nombre}</Link> : ''}</td>
                  <td>{inscripcion.proyecto ? <a>{inscripcion.proyecto.semillero.institucion.nombre}</a> : ''}</td>
                  <td>{inscripcion.proyecto ? <a>{inscripcion.proyecto.semillero.nombre}</a> : ''}</td>
                  <td>
                    {inscripcion.delegado ? (
                      <Link to={`delegado-institucional/${inscripcion.delegado.id}`}>{inscripcion.delegado.persona.nombres}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${inscripcion.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${inscripcion.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${inscripcion.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.inscripcion.home.notFound">No Inscripcions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ inscripcion }: IRootState) => ({
  inscripcionList: inscripcion.entities,
  loading: inscripcion.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Inscripcion);
