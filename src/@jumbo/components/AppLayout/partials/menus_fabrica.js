import React from 'react';
import {   People, PostAdd, ShoppingCart, Widgets, GrainOutlined, FiberManualRecord  } from '@material-ui/icons'; 
import IntlMessages from '../../../utils/IntlMessages';

 
export const sidebarNavFabrica = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
       
      {
        name: <IntlMessages id={'sidebar.sale'} />,
        icon: <ShoppingCart />,
        type: 'collapse', 
        children: [
          {
            name: <IntlMessages id={'sidebar.create_orders'} />, 
            type: 'item',
            icon: <GrainOutlined style={{ fontSize: 20 }}/>,  
            link: '/create_orders',
          },
        ],
      }, 
      {
        name: <IntlMessages id={'sidebar.orders'} />,
        icon: <PostAdd />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.list_orders'} />,
            type: 'item',  
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/orders/list_orders',
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
