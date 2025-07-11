export const getLogs = () => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('auditLogs');
    return raw ? JSON.parse(raw) : [];
  }
  return [];
};

export const logAction = ({ admin, listingId, action }) => {
  if (typeof window !== 'undefined') {
    const oldLogs = getLogs();
    const newLogs = [
      ...oldLogs,
      {
        admin,
        listingId,
        action,
        timestamp: new Date().toISOString(), // optional
      },
    ];
    localStorage.setItem('auditLogs', JSON.stringify(newLogs));
  }
};
