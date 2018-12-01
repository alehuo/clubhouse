const hasPermission = (userPerms: number, perm: number) => (userPerms & perm) === perm;

export default { hasPermission };
