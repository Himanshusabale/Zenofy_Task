import PropTypes from 'prop-types';

const GoalSummary = ({ user }) => {
  if (!user || !user.goals) return null;

  const totalGoals = user.goals.length;
  const completedGoals = user.goals.filter(goal => goal.status === 'Completed').length;
  const completionPercentage = totalGoals ? Math.round((completedGoals / totalGoals) * 100) : 0;


    return (
      <div className="goal-summary-card">
        <h3>Goal Summary for {user.name}</h3>
        <p>Total Goals: {totalGoals}</p>
        <p>Completed Goals: {completedGoals}</p>
        <p>Completion Percentage: {completionPercentage}%</p>
      </div>
    );
};

GoalSummary.propTypes = {
  user: PropTypes.array.isRequired,
};

export default GoalSummary;
