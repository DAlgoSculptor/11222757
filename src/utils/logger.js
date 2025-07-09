let logStorage = [];

export const logEvent = (message, meta = {}) => {
  logStorage.push({ timestamp: new Date(), message, meta });
};

export const getLogs = () => logStorage;
