export const config = {
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
};

export const isMockMode = () => config.useMockApi;
