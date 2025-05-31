export const getOrCreateClientId = (): string => {
  let clientId = localStorage.getItem("clientId");

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("clientId", clientId);
  }

  return clientId;
};
