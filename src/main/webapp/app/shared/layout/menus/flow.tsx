import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const FlowMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="arrow-alt-right" to="/institucion">
      <Translate contentKey="global.menu.entities.institucion" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/semillero">
      <Translate contentKey="global.menu.entities.semillero" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/proyecto">
      <Translate contentKey="global.menu.entities.proyecto" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/estudiante">
      <Translate contentKey="global.menu.entities.estudiante" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/delegado-institucional">
      <Translate contentKey="global.menu.entities.delegadoInstitucional" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/area">
      <Translate contentKey="global.menu.entities.area" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/evento">
      <Translate contentKey="global.menu.entities.evento" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/inscripcion">
      <Translate contentKey="global.menu.entities.inscripcion" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/evaluador">
      <Translate contentKey="global.menu.entities.evaluador" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/ponencia">
      <Translate contentKey="global.menu.entities.ponencia" />
    </MenuItem>
    <MenuItem icon="arrow-alt-right" to="/evaluacion">
      <Translate contentKey="global.menu.entities.evaluacion" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
