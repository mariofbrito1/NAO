import React from 'react';
import {   People, PostAdd, ShoppingCart, Widgets, GrainOutlined, FiberManualRecord  } from '@material-ui/icons'; 
import IntlMessages from '../../../utils/IntlMessages';

// ACA VA EL MENU MFB
export const sidebarNavs = [
  {
    name: '',
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
          {
            name: <IntlMessages id={'sidebar.list_orders_presupuesto'} />,
            type: 'item',  
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/orders/list_orders_presupuesto',
          },
        ],
      },
       

      {
        name: <IntlMessages id={'sidebar.products'} />,
        icon: <Widgets />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.management_products'} />, 
            type: 'item', 
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/products/products',
          }, 
        ],
      },
      {
        name: <IntlMessages id={'sidebar.proveedor'} />,
        icon: <Widgets />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.proveedores'} />, 
            type: 'item', 
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/providers/providers',
          }, 
        ],
      },
      {
        name: <IntlMessages id={'sidebar.receipt'} />,
        icon: <Widgets />,
        type: 'collapse',
        children: [
          {
            name: <IntlMessages id={'sidebar.receipt'} />, 
            type: 'item', 
            icon: <FiberManualRecord style={{ fontSize: 10 }}/>,  
            link: '/receipt/receipts',
          }, 
        ],
      },

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
