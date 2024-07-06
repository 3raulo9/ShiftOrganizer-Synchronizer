import React from 'react';
import '../styles/UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.user_name} - {user.company_name}</h2>
      <div dangerouslySetInnerHTML={{ __html: user.shift_data_of_the_current_week }} />
      <div dangerouslySetInnerHTML={{ __html: user.shift_data }} />
    </div>
  );
};

export default UserCard;
