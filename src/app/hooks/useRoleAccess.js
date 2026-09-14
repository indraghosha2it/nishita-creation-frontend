// hooks/useRoleAccess.js
import { useState, useEffect } from 'react';

export const useRoleAccess = () => {
  const [userRole, setUserRole] = useState(null);
  const [dashboardAccess, setDashboardAccess] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles/dashboard-access`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserRole(data.data.role);
            setDashboardAccess(data.data.access || []);
            setPermissions(data.data.permissions || []);
          }
        }
      } catch (error) {
        console.error('Error fetching role access:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccess();
  }, []);

  const canAccess = (accessKey) => {
    if (userRole === 'super_admin') return true;
    return dashboardAccess.includes(accessKey);
  };

  const hasPermission = (permission) => {
    if (userRole === 'super_admin') return true;
    return permissions.includes(permission);
  };

  return {
    userRole,
    dashboardAccess,
    permissions,
    loading,
    canAccess,
    hasPermission,
    isSuperAdmin: userRole === 'super_admin',
    isAdmin: userRole === 'admin' || userRole === 'super_admin',
    isModerator: ['super_admin', 'admin', 'moderator'].includes(userRole),
    isCallCenterAgent: ['super_admin', 'admin', 'moderator', 'call_center_agent'].includes(userRole)
  };
};