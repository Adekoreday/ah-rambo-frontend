import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../../actions/user/login';
import {
  Input, Form, Button, SocialLogin
} from '../common';
import './login.scss';
import { GoogleIcon, FacebookIcon, TwitterIcon } from '../../../assets/icons';

/**
 *
 *
 * @export
 * @class Login
 * @param {Object} e event-listener
 * @extends {Component}
 */
export class Login extends Component {
  state = {
    userLogin: '',
    password: '',
    errors: {
      userLogin: '',
      password: '',
      server: '',
    },
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFocus = () => {
    this.setState({ errors: { userLogin: '', password: '', server: '' } });
  }

   handleSubmit = async (e) => {
     e.preventDefault();
     const { userLogin, password, errors } = this.state;
     errors.userLogin = userLogin.trim().length < 6 ? 'Input must be 6 characters long!' : '';
     errors.password = password.trim().length < 8 ? 'Password must be 8 characters long!' : '';
     this.setState({ errors });
     if (userLogin && password && Object.values(errors).every((err) => !err)) {
       await this.props.login(userLogin, password);
       const { error, history: { push } } = this.props;
       this.setState({ errors: { server: error } });
       if (!error) {
         if (this.props.location.state) {
           push(this.props.location.state.referrer);
         } else {
           push('/home');
         }
       }
     }
   }

   /**
    * @name render
    * @returns {HMTL} HTML DOM Elements
    */
   render() {
     const {
       state: {
         userLogin, password, errors
       },
       props: { error, isLoading }
     } = this;
     return (
       <div className="container">
         <main className="Login">
           <section className="Login__info">
             <h2 className="Login__info__header">
              Inspire the next generation of users by
               <br />
              continuously voicing your innovative ideas
             </h2>
             <p className="Login__info__text">Join the world&apos;s largest community of writers and readers</p>
             <p className="Login__info__text">20M+ active users</p>
             <p className="Login__info__text">Over 2000+ new stories daily</p>
             <p className="Login__info__text">No hidden charges. Get started for free now!</p>
           </section>
           <div className="Login__form">
             <p className="Login__form__header">Log In</p>
             <Form className="form" onSubmit={this.handleSubmit}>
               <Input
                 type="text"
                 className={errors.userLogin && 'has-validation-error'}
                 error={errors.userLogin}
                 name="userLogin"
                 value={userLogin}
                 placeholder="email or username"
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
               />

               <Input
                 type="password"
                 className={errors.password && 'has-validation-error'}
                 error={errors.password}
                 name="password"
                 value={password}
                 placeholder="password"
                 onChange={this.handleChange}
                 onFocus={this.handleFocus}
               />
               {error && (<p className="center input-validation-error">{errors.server}</p>)}
               <div className="form-field">
                 <Button
                   className="btn"
                   title="Please fill up the form"
                   label={isLoading ? 'Please wait...' : 'Submit'}
                   disabled={isLoading}
                 />
               </div>
               <p className="center">
                 <Link to="/forgotPassword"> Forgot Password?</Link>
               </p>
             </Form>
             <div className="form__footer">
               <span>
                 <SocialLogin />
               </span>
               <span>
                  Don&apos;t have an account?
                 <Link to="/signup">Sign Up</Link>

               </span>
             </div>
           </div>
         </main>
       </div>
     );
   }
}

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export const mapState = (state) => state.loginReducer;
const actionCreators = {
  login,
};
export default connect(
  mapState,
  actionCreators
)(Login);
