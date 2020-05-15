import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/persona">
      <Translate contentKey="global.menu.entities.persona" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-identificacion">
      <Translate contentKey="global.menu.entities.tipoIdentificacion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/usuario-ucentral">
      <Translate contentKey="global.menu.entities.usuarioUcentral" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/nodo">
      <Translate contentKey="global.menu.entities.nodo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/institucion">
      <Translate contentKey="global.menu.entities.institucion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/departamento">
      <Translate contentKey="global.menu.entities.departamento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ciudad">
      <Translate contentKey="global.menu.entities.ciudad" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/programa">
      <Translate contentKey="global.menu.entities.programa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/estudiante">
      <Translate contentKey="global.menu.entities.estudiante" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/profesor">
      <Translate contentKey="global.menu.entities.profesor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/semillero">
      <Translate contentKey="global.menu.entities.semillero" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/proyecto">
      <Translate contentKey="global.menu.entities.proyecto" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/proyecto-categoria">
      <Translate contentKey="global.menu.entities.proyectoCategoria" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/area-conocimiento">
      <Translate contentKey="global.menu.entities.areaConocimiento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/evento">
      <Translate contentKey="global.menu.entities.evento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/inscripcion">
      <Translate contentKey="global.menu.entities.inscripcion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/delegado-institucional">
      <Translate contentKey="global.menu.entities.delegadoInstitucional" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tipo-area">
      <Translate contentKey="global.menu.entities.tipoArea" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/area">
      <Translate contentKey="global.menu.entities.area" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ponencia">
      <Translate contentKey="global.menu.entities.ponencia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/evaluacion">
      <Translate contentKey="global.menu.entities.evaluacion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/evaluador">
      <Translate contentKey="global.menu.entities.evaluador" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/regla">
      <Translate contentKey="global.menu.entities.regla" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/estadistica">
      <Translate contentKey="global.menu.entities.estadistica" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
