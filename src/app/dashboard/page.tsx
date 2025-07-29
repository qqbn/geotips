import React from 'react'
import { requireAuth } from '@/lib/auth';
import { DashboardClient } from './dashboard-client';

const DashboardPage = async () => {
    const user = await requireAuth();

    return <DashboardClient user={user} />;
}

export default DashboardPage;