import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './regla.reducer';
import { IRegla } from 'app/shared/model/regla.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReglaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Regla = (props: IReglaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { reglaList, match, loading } = props;
  return (
    <div>
      <h2 id="regla-heading">
        <Translate contentKey="ucentralEventosApplicationApp.regla.home.title">Reglas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.regla.home.createLabel">Create new Regla</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {reglaList && reglaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.regla.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.regla.llave">Llave</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.regla.valor">Valor</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.regla.auxiliar">Auxiliar</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.regla.evento">Evento</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reglaList.map((regla, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${regla.id}`} color="link" size="sm">
                      {regla.id}
                    </Button>
                  </td>
                  <td>{regla.nombre}</td>
                  <td>{regla.llave}</td>
                  <td>{regla.valor}</td>
                  <td>{regla.auxiliar}</td>
                  <td>
                    {regla.eventos
                      ? regla.eventos.map((val, j) => (
                          <span key={j}>
                            <Link to={`evento/${val.id}`}>{val.id}</Link>
                            {j === regla.eventos.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${regla.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${regla.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${regla.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.regla.home.notFound">No Reglas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ regla }: IRootState) => ({
  reglaList: regla.entities,
  loading: regla.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Regla);
