import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "./api/health";

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unknown error");
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-600">ChatSphere</h1>
      {error && <p>Error: {error}</p>}
      {!error && !health && <p>Checking server...</p>}
      {health && (
        <p>
          Server status: {health.status} ({health.timestamp})
        </p>
      )}
    </div>
  );
}

export default App;
