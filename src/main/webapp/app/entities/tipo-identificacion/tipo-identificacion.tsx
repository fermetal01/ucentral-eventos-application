import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tipo-identificacion.reducer';
import { ITipoIdentificacion } from 'app/shared/model/tipo-identificacion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoIdentificacionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TipoIdentificacion = (props: ITipoIdentificacionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tipoIdentificacionList, match, loading } = props;
  return (
    <div>
      <h2 id="tipo-identificacion-heading">
        <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.home.title">Tipo Identificacions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.home.createLabel">
            Create new Tipo Identificacion
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {tipoIdentificacionList && tipoIdentificacionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.nombres">Nombres</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.codigo">Codigo</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tipoIdentificacionList.map((tipoIdentificacion, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tipoIdentificacion.id}`} color="link" size="sm">
                      {tipoIdentificacion.id}
                    </Button>
                  </td>
                  <td>{tipoIdentificacion.nombres}</td>
                  <td>{tipoIdentificacion.codigo}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tipoIdentificacion.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tipoIdentificacion.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tipoIdentificacion.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.home.notFound">
                No Tipo Identificacions found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tipoIdentificacion }: IRootState) => ({
  tipoIdentificacionList: tipoIdentificacion.entities,
  loading: tipoIdentificacion.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoIdentificacion);
