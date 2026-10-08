import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed"));

    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div style={{
      fontFamily: "Arial",
      textAlign: "center",
      padding: "50px"
    }}>
      <h1>Full Stack CI/CD Application</h1>

      <h2>React Frontend</h2>

      <p>{message}</p>

      <h3>Users from MongoDB</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            {user.name}
          </div>
        ))
      )}
    </div>
  );
}

export default App;