import { CoreMenu } from '@core/types';


export const menu: CoreMenu[] = [
  
  {
    id: 'home',
    title: 'Dashboard',
    // translate: 'MENU.APPS.EMAIL',
    type: 'item',
    icon: 'home',
    url: 'dashboard'
  },
  {
    id: 'import_request',
    title: 'Import Request',
    // translate: 'MENU.APPS.EMAIL',
    type: 'item',
    icon: 'upload-cloud',
    url: 'import/list'
  }
];
