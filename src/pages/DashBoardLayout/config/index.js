import React from 'react';
import DashBoard from '../page/index'

const router = [
    {
        path : '/',
        exact : false,
        auth: false,
        // permission_route: 2,
        main : () => <DashBoard />
    },
]

export default router