const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      throw new Error(body.detail ?? fallback);
    } catch {
      throw new Error(fallback);
    }
  }

  return response.json();
}

export const api = {
  listProblems: ({ difficulty, topic, q } = {}) => {
    const params = new URLSearchParams();
    if (difficulty) {
      params.set("difficulty", difficulty);
    }
    if (topic) {
      params.set("topic", topic);
    }
    if (q) {
      params.set("q", q);
    }
    const query = params.toString();
    return request(`/problems${query ? `?${query}` : ""}`);
  },
  getProblem: (problemId) => request(`/problems/${problemId}`),
  runSubmission: (payload) =>
    request("/submissions/run", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getHint: (payload) =>
    request("/assistant/hint", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
