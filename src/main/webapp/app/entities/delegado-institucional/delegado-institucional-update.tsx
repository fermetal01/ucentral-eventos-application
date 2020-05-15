import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPersona } from 'app/shared/model/persona.model';
import { getEntities as getPersonas } from 'app/entities/persona/persona.reducer';
import { IInstitucion } from 'app/shared/model/institucion.model';
import { getEntities as getInstitucions } from 'app/entities/institucion/institucion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './delegado-institucional.reducer';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDelegadoInstitucionalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DelegadoInstitucionalUpdate = (props: IDelegadoInstitucionalUpdateProps) => {
  const [idsinstitucion, setIdsinstitucion] = useState([]);
  const [personaId, setPersonaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { delegadoInstitucionalEntity, personas, institucions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/delegado-institucional');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPersonas();
    props.getInstitucions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...delegadoInstitucionalEntity,
        ...values,
        institucions: mapIdList(values.institucions)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ucentralEventosApplicationApp.delegadoInstitucional.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.home.createOrEditLabel">
              Create or edit a DelegadoInstitucional
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : delegadoInstitucionalEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="delegado-institucional-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="delegado-institucional-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codigoLabel" for="delegado-institucional-codigo">
                  <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.codigo">Codigo</Translate>
                </Label>
                <AvField id="delegado-institucional-codigo" type="text" name="codigo" />
              </AvGroup>
              <AvGroup>
                <Label for="delegado-institucional-persona">
                  <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.persona">Persona</Translate>
                </Label>
                <AvInput id="delegado-institucional-persona" type="select" className="form-control" name="persona.id">
                  <option value="" key="0" />
                  {personas
                    ? personas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="delegado-institucional-institucion">
                  <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.institucion">Institucion</Translate>
                </Label>
                <AvInput
                  id="delegado-institucional-institucion"
                  type="select"
                  multiple
                  className="form-control"
                  name="institucions"
                  value={delegadoInstitucionalEntity.institucions && delegadoInstitucionalEntity.institucions.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {institucions
                    ? institucions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/delegado-institucional" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  personas: storeState.persona.entities,
  institucions: storeState.institucion.entities,
  delegadoInstitucionalEntity: storeState.delegadoInstitucional.entity,
  loading: storeState.delegadoInstitucional.loading,
  updating: storeState.delegadoInstitucional.updating,
  updateSuccess: storeState.delegadoInstitucional.updateSuccess
});

const mapDispatchToProps = {
  getPersonas,
  getInstitucions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DelegadoInstitucionalUpdate);
