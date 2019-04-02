import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../modules/Auth/selectors';
import SignUpForm from '../modules/Auth/SignUpForm/SignUpForm';

// export default class SignUp extends Component {
//   render() {
//     return (
//       <div>
//         <h1 style={{ textAlign: 'center', fontWeight: 500 }}>
//           Create your acccount for free
//         </h1>
//         <SignUpForm />
//       </div>
//     );
//   }
// }

class SignUp extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuthenticated) {
      // 59:00(3) Деструктуризация. Вернет первый true
      // const { from } = this.props.location.state || { from: { pathname: '/' } };

      // this.props.history.push(from);
      this.props.history.push(`/menu`);
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 500 }}>
          Create your acccount for free
        </h1>
        <SignUpForm />
      </div>
    );
  }
}

export default connect(state => ({
  isAuthenticated: selectors.isAuthenticated(state),
}))(SignUp);

//
// this.props.history.push({
//   pathname: this.props.location.pathname,
//   search: `/menu`,
// });
