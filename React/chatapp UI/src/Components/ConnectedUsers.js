const ConnectedUsers = ({ users }) => (
  <div className="userlist">
    <h4> ConnectedUsers</h4>
    {users.map((u, idx) => (
      <h6 key={idx}>{u}</h6>
    ))}
  </div>
);
export default ConnectedUsers;
