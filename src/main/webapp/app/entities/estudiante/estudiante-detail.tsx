import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './estudiante.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstudianteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstudianteDetail = (props: IEstudianteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { estudianteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.estudiante.detail.title">Estudiante</Translate> [<b>{estudianteEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="carrera">
              <Translate contentKey="ucentralEventosApplicationApp.estudiante.carrera">Carrera</Translate>
            </span>
          </dt>
          <dd>{estudianteEntity.carrera}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.estudiante.persona">Persona</Translate>
          </dt>
          <dd>{estudianteEntity.persona ? estudianteEntity.persona.nombres+" "+estudianteEntity.persona.apellidos : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.estudiante.programa">Programa</Translate>
          </dt>
          <dd>{estudianteEntity.programa ? estudianteEntity.programa.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.estudiante.proyecto">Proyecto</Translate>
          </dt>
          <dd>
            {estudianteEntity.proyectos
              ? estudianteEntity.proyectos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nombre}</a>
                    {i === estudianteEntity.proyectos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/estudiante" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estudiante/${estudianteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ estudiante }: IRootState) => ({
  estudianteEntity: estudiante.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstudianteDetail);
