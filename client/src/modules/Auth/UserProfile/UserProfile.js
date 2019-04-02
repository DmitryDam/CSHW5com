import React from 'react';
import Button from '../common/Button/Button';
import classes from './UserProfile.module.css';

const UserProfile = ({ user: { name }, onSignOut = () => null }) => (
  // { user: { name } деструктуризация пропа user
  <div className={classes.container}>
    <img
      className={classes.image}
      src="https://www.redditstatic.com/new-icon.png"
      widt="40"
      height="40"
      alt=""
    />
    <span className={classes.name}>{name}</span>

    <Button label="Sign out" onClick={onSignOut} />
  </div>
);

export default UserProfile;
