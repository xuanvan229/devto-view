import React from 'react';
import Login from '../page/index'

const router = [
    {
        path : '/login',
        exact : false,
        auth: false,
        permission_route: 2,
        main : () => <Login />
    },
]

export default router