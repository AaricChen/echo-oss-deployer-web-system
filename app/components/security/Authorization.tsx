import { useMemo } from "react";
import { useCurrentAccount } from "~/apis/account";
import { type Permission } from "~/types/permission";

export interface AuthorizationProps {
  permission?: Permission | Permission[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function Authorization({
  permission,
  fallback,
  children,
}: AuthorizationProps) {
  const { data: account } = useCurrentAccount();

  const hasPermission = useMemo(() => {
    if (!account) {
      return false;
    }
    if (account.admin) {
      return true;
    }
    if (!permission) {
      return true;
    }
    if (Array.isArray(permission)) {
      return permission.some((p) => account.permissions.includes(p));
    }
    return account.permissions.includes(permission);
  }, [account, permission]);

  return hasPermission ? children : fallback;
}
