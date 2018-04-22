const hasPermission = (userPerms, perm) => (userPerms & perm) === perm;

export default { hasPermission };
