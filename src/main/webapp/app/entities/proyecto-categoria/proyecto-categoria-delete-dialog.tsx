import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProyectoCategoria } from 'app/shared/model/proyecto-categoria.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './proyecto-categoria.reducer';

export interface IProyectoCategoriaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProyectoCategoriaDeleteDialog = (props: IProyectoCategoriaDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/proyecto-categoria');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.proyectoCategoriaEntity.id);
  };

  const { proyectoCategoriaEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ucentralEventosApplicationApp.proyectoCategoria.delete.question">
        <Translate
          contentKey="ucentralEventosApplicationApp.proyectoCategoria.delete.question"
          interpolate={{ id: proyectoCategoriaEntity.id }}
        >
          Are you sure you want to delete this ProyectoCategoria?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-proyectoCategoria" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ proyectoCategoria }: IRootState) => ({
  proyectoCategoriaEntity: proyectoCategoria.entity,
  updateSuccess: proyectoCategoria.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProyectoCategoriaDeleteDialog);
