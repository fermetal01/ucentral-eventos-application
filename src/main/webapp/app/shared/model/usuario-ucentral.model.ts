import { IUser } from 'app/shared/model/user.model';
import { IPersona } from 'app/shared/model/persona.model';

export interface IUsuarioUcentral {
  id?: number;
  emailUcentral?: string;
  user?: IUser;
  persona?: IPersona;
}

export const defaultValue: Readonly<IUsuarioUcentral> = {};
