import apiService from "./apiService";

// Use import.meta.env to access environment variables in Vite
const baseUrl = import.meta.env.VITE_BASE_URL;

const env = {
  async get(path: string, params?: any) {
    try {
      const url = new URL(path, baseUrl); // Constructs the full URL
      console.log("url", url);

      if (params) {
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await apiService(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      console.error("GET Error: ", error);
      throw error;
    }
  },

  async post(path: string, payload: any) {
    try {
      const response = await apiService(baseUrl + path, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      return await response.json();
    } catch (error) {
      console.error("POST Error: ", error);
      throw error;
    }
  },

  async put(path: string, payload: any) {
    try {
      const response = await apiService(baseUrl + path, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      return await response.json();
    } catch (error) {
      console.error("PUT Error: ", error);
      throw error;
    }
  },
};

export default env;
