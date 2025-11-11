import React from 'react';
import {   People, PostAdd, ShoppingCart, Widgets, GrainOutlined, FiberManualRecord  } from '@material-ui/icons'; 
import IntlMessages from '../../../utils/IntlMessages';

// ACA VA EL MENU MFB
export const sidebarNavsUsuarios = [
  {
    name: '',
    type: 'section',
    children: [
       
      {
        name: <IntlMessages id={'sidebar.modules.users'} />,
        icon: <People />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.profiles'} />,
            type: 'item', 
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/user/roles',
          },
          {
            name: <IntlMessages id={'sidebar.modules.users.permissions'} />,
            type: 'item', 
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/user/section',
          }, 
          {
            name: <IntlMessages id={'sidebar.modules.users'} />,
            type: 'item',
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,   
            link: '/user/users',
          },
        ],
      },
      
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      
    ],
  },
];
