const API_URL = "http://localhost:8080/api";

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

export const getSummary = async (portfolioId, token) => {
  const response = await fetch(`${API_URL}/portfolios/${portfolioId}/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

