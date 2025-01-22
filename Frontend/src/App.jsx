import { useState } from 'react';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import AddUserForm from './components/AddUserForm';
import UserDetailsModal from './components/UserDetailsModal';
import GoalSummary from './components/GoalSummary';
import './App.css'; // Import the CSS file

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', goals: [] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', goals: [] },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value); // Update searchTerm state when search box changes
  };

  // Function to handle adding a goal to a user
  const handleAddGoal = (userId, goal) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          goals: [...user.goals, goal], // Add the new goal to the user's goals
        };
      }
      return user;
    });
    setUsers(updatedUsers); // Update the state with the new users array
  };

  // Function to handle toggling the goal status (completed/in-progress)
  const handleToggleGoalStatus = (userId, goalIndex) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const updatedGoals = [...user.goals];
        updatedGoals[goalIndex].status =
          updatedGoals[goalIndex].status === 'In Progress' ? 'Completed' : 'In Progress'; // Toggle status
        return { ...user, goals: updatedGoals };
      }
      return user;
    });
    setUsers(updatedUsers); // Update the state with the new users array
  };

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now(), goals: [] }]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <h1>User Dashboard</h1>

        {/* Search bar */}
        <div className="search-bar">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>

        {/* User List */}
        <div className="user-list">
          <UserList users={filteredUsers} onUserClick={setSelectedUser} />
        </div>

        {/* Show modal if a user is selected */}
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onAddGoal={handleAddGoal}
            onToggleGoalStatus={handleToggleGoalStatus}
            closeModal={() => setSelectedUser(null)}
          />
        )}

        {/* Add User Form */}
        <div className="add-user-form">
          <AddUserForm addUser={addUser} />
        </div>

        {/* Goal Summary for the selected user */}
        <div className="goal-summary">
          {selectedUser && <GoalSummary user={selectedUser} />}
        </div>
      </div>
    </>
  );
};

export default App;
