import React, { Component } from 'react';

import './home.css';

//import withAuthorization from './withAuthorization';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  // componentDidMount() {
  //     db.onceGetUsers().then(snapshot =>
  //         this.setState(() => ({ users: snapshot.val() }))
  //     );
  // }

  render() {
    const { users } = this.state;

    return (
      <div className="container">
        <div className="home">
          <h1>Home</h1>
          <p>The Home Page is accessible by every signed in user.</p>
          {!!users && <UserList users={users} />}
        </div>
      </div>
    );
  }
}
const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
);

// const authCondition = (authUser) => !!authUser;

// export default withAuthorization(authCondition)(HomePage);
