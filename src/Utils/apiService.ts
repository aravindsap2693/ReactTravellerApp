const apiService = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers: any = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  if (accessToken) {
    // headers["Authorization"] = `Bearer ${accessToken}`;
    headers["apikey"] = "611862563a1763-97e7-4707-9966-6efbc2550e54";
    headers["accept"] = "/";
  }

  const updatedOptions = {
    ...options,
    headers,
  };

  let response = await fetch(url, updatedOptions);

  if (response.status === 401) {
    // Try to refresh the token
    try {
      const newAccessToken = await refreshAccessToken();

      // Retry the original request with the new access token
      headers["Authorization"] = `Bearer ${newAccessToken}`;

      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (error) {
      // If token refresh fails, throw an error and redirect to login if necessary
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "An error occurred");
  }

  return response;
};

export default apiService;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("accessToken");

  if (!refreshToken) {
    throw new Error("No refresh token available. Please log in again.");
  }

  const response = await fetch("/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token. Please log in again.");
  }

  const data = await response.json();

  // Store the new access token and refresh token in localStorage
  localStorage.setItem("accessToken", data.accessToken);

  return data.accessToken;
};
