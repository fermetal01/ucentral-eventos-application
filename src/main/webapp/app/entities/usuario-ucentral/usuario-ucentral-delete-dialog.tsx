import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './usuario-ucentral.reducer';

export interface IUsuarioUcentralDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UsuarioUcentralDeleteDialog = (props: IUsuarioUcentralDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/usuario-ucentral');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.usuarioUcentralEntity.id);
  };

  const { usuarioUcentralEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ucentralEventosApplicationApp.usuarioUcentral.delete.question">
        <Translate
          contentKey="ucentralEventosApplicationApp.usuarioUcentral.delete.question"
          interpolate={{ id: usuarioUcentralEntity.id }}
        >
          Are you sure you want to delete this UsuarioUcentral?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-usuarioUcentral" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ usuarioUcentral }: IRootState) => ({
  usuarioUcentralEntity: usuarioUcentral.entity,
  updateSuccess: usuarioUcentral.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUcentralDeleteDialog);
