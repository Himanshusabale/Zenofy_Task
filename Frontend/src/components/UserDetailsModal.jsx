import { useState } from 'react';
import PropTypes from 'prop-types';

const UserDetailsModal = ({ user, onAddGoal, onToggleGoalStatus }) => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [goalStatus, setGoalStatus] = useState('In Progress'); // default status

  // Handle form submission to add a new goal
  const handleGoalSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      title: goalTitle,
      deadline: goalDeadline,
      status: goalStatus,
    };

    // Pass the new goal to the parent component to update the user's goals
    onAddGoal(user.id, newGoal);

    // Reset the form fields
    setGoalTitle('');
    setGoalDeadline('');
    setGoalStatus('In Progress');
  };

  // Handle toggling the status of a goal (completed/in-progress)
  const handleGoalStatusToggle = (goalIndex) => {
    onToggleGoalStatus(user.id, goalIndex);
  };

  return (
    <div>
      <h3>{user.name}s Goals</h3>

      {/* Goal form */}
      <form onSubmit={handleGoalSubmit}>
        <input
          type="text"
          placeholder="Goal Title"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={goalDeadline}
          onChange={(e) => setGoalDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <h4>Goals:</h4>
      {user.goals && user.goals.length > 0 ? (
        <ul>
          {user.goals.map((goal, index) => (
            <li key={index}>
              <strong>{goal.title}</strong> - {goal.deadline} - 
              <span style={{ color: goal.status === 'Completed' ? 'green' : 'orange' }}>
                {goal.status}
              </span>
              <button onClick={() => handleGoalStatusToggle(index)}>
                Mark as {goal.status === 'In Progress' ? 'Completed' : 'In Progress'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals yet.</p>
      )}
    </div>
  );
};

UserDetailsModal.propTypes = {
  user: PropTypes.object.isRequired,
  onAddGoal: PropTypes.func.isRequired,
  onToggleGoalStatus: PropTypes.func.isRequired,
};

export default UserDetailsModal;
