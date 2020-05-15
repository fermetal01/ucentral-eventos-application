import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './persona.reducer';
import { IPersona } from 'app/shared/model/persona.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPersonaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Persona = (props: IPersonaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { personaList, match, loading } = props;
  return (
    <div>
      <h2 id="persona-heading">
        <Translate contentKey="ucentralEventosApplicationApp.persona.home.title">Personas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ucentralEventosApplicationApp.persona.home.createLabel">Create new Persona</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {personaList && personaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.nombres">Nombres</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.apellidos">Apellidos</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.numeroIdenficacion">Numero Idenficacion</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.ciudad">Ciudad</Translate>
                </th>
                <th>
                  <Translate contentKey="ucentralEventosApplicationApp.persona.tipoIdentificacion">Tipo Identificacion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personaList.map((persona, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${persona.id}`} color="link" size="sm">
                      {persona.id}
                    </Button>
                  </td>
                  <td>{persona.nombres}</td>
                  <td>{persona.apellidos}</td>
                  <td>{persona.numeroIdenficacion}</td>
                  <td>{persona.email}</td>
                  <td>{persona.ciudad ? <Link to={`ciudad/${persona.ciudad.id}`}>{persona.ciudad.id}</Link> : ''}</td>
                  <td>
                    {persona.tipoIdentificacion ? (
                      <Link to={`tipo-identificacion/${persona.tipoIdentificacion.id}`}>{persona.tipoIdentificacion.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${persona.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${persona.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${persona.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ucentralEventosApplicationApp.persona.home.notFound">No Personas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ persona }: IRootState) => ({
  personaList: persona.entities,
  loading: persona.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Persona);
