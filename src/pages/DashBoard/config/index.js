import React from 'react';
import DashBoard from '../page/index'

const router = [
    {
        path : '/',
        exact : true,
        auth: true,
        // permission_route: 2,
        main : () => <DashBoard />
    },
]

export default router