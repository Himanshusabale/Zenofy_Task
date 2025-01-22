import PropTypes from 'prop-types';

const UserList = ({ users, onUserClick }) => {
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.id}
          className={`user-card ${user.active ? 'active' : ''}`}
          onClick={() => onUserClick(user)}
        >
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      ))}
    </div>
  );
};


UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onUserClick: PropTypes.func.isRequired,
};

export default UserList;
