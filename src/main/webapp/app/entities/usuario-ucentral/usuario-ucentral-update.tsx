import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPersona } from 'app/shared/model/persona.model';
import { getEntities as getPersonas } from 'app/entities/persona/persona.reducer';
import { getEntity, updateEntity, createEntity, reset } from './usuario-ucentral.reducer';
import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioUcentralUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UsuarioUcentralUpdate = (props: IUsuarioUcentralUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [personaId, setPersonaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { usuarioUcentralEntity, users, personas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/usuario-ucentral');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getPersonas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...usuarioUcentralEntity,
        ...values
      };
      entity.user = users[values.user];

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
          <h2 id="ucentralEventosApplicationApp.usuarioUcentral.home.createOrEditLabel">
            <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.home.createOrEditLabel">
              Create or edit a UsuarioUcentral
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : usuarioUcentralEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="usuario-ucentral-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="usuario-ucentral-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="emailUcentralLabel" for="usuario-ucentral-emailUcentral">
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.emailUcentral">Email Ucentral</Translate>
                </Label>
                <AvField id="usuario-ucentral-emailUcentral" type="text" name="emailUcentral" />
              </AvGroup>
              <AvGroup>
                <Label for="usuario-ucentral-user">
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.user">User</Translate>
                </Label>
                <AvInput id="usuario-ucentral-user" type="select" className="form-control" name="user">
                  <option value="" key="0" />
                  {users
                    ? users.map((otherEntity, index) => (
                        <option value={index} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="usuario-ucentral-persona">
                  <Translate contentKey="ucentralEventosApplicationApp.usuarioUcentral.persona">Persona</Translate>
                </Label>
                <AvInput id="usuario-ucentral-persona" type="select" className="form-control" name="persona.id">
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
              <Button tag={Link} id="cancel-save" to="/usuario-ucentral" replace color="info">
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
  users: storeState.userManagement.users,
  personas: storeState.persona.entities,
  usuarioUcentralEntity: storeState.usuarioUcentral.entity,
  loading: storeState.usuarioUcentral.loading,
  updating: storeState.usuarioUcentral.updating,
  updateSuccess: storeState.usuarioUcentral.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getPersonas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUcentralUpdate);
