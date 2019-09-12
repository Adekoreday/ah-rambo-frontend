import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import signupInputSchema from '../../schemas/signup';
import signupAction from '../../actions/user/signupAction';
import {
  Form, Input, Button, SocialLogin
} from '../common';
import './Signup.scss';

/**
 *
 *
 * @export
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
  };

  getValidationErrorMessages = (error) => {
    const validationErrors = {};
    const errorDetails = error.details;
    const errorsLength = errorDetails.length;

    for (let i = errorsLength - 1; i >= 0; i -= 1) {
      const errorDetail = errorDetails[i];
      const input = errorDetail.path[0];
      validationErrors[input] = errorDetail.message;
    }

    return validationErrors;
  };

  validateInputs = () => {
    const { data } = this.state;
    const VALIDATION_OPTION = { abortEarly: false };

    const { error } = Joi.validate(data, signupInputSchema, VALIDATION_OPTION);

    if (!error) return null;
    return this.getValidationErrorMessages(error);
  };

  renderSignupError = () => {
    const { errors } = this.state;
    const {
      signup: { error },
    } = this.props;

    this.setState({ errors: { ...errors, signup: error } });
  };

  redirectUserToProfilePage = () => {
    const {
      location: { state },
      history: { push },
    } = this.props;

    if (state) {
      push(state.referrer);
    } else {
      window.location = '/profile';
    }
  };

  handleChange = ({ target }) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [target.name]: target.value } });
  };

  clearErrorMessages = ({ target }) => {
    const { errors } = this.state;
    this.setState({ errors: { ...errors, [target.name]: '' } });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { data: user } = this.state;

    const validationErrors = this.validateInputs();
    this.setState({
      errors: validationErrors || {},
    });

    if (validationErrors) return null;

    await this.props.signupAction(user);

    const { signup } = this.props;
    if (signup.error) this.renderSignupError();
    if (signup.signedUp) this.redirectUserToProfilePage();
  };

  /**
   *
   *
   * @returns
   * @memberof Signup
   */
  render() {
    const { data, errors } = this.state;
    const { signup } = this.props;

    return (
      <main className="Signup">
        <section className="Signup__info">
          <h2 className="Signup__info__header">Give your dreams a voice</h2>
          <p className="Signup__info__text">
            Join the world&apos;s largest community of writers and readers
          </p>
          <p className="Signup__info__text">20M+ active users</p>
          <p className="Signup__info__text">Over 2000+ new stories daily</p>
          <p className="Signup__info__text">
            No hidden charges. Get started for free now!
          </p>
        </section>

        <section className="Signup__form">
          <h1 className="Signup__form__header">Sign Up</h1>

          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              value={data.firstName}
              name="firstName"
              placeholder="Enter first name"
              className={errors.firstName && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.firstName}
            />

            <Input
              type="text"
              value={data.lastName}
              name="lastName"
              placeholder="Enter last name"
              className={errors.lastName && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.lastName}
            />

            <Input
              type="text"
              value={data.userName}
              name="userName"
              placeholder="Enter username"
              className={errors.userName && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.userName}
            />

            <Input
              type="email"
              value={data.email}
              name="email"
              placeholder="Enter email"
              className={errors.email && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.email}
            />

            <Input
              type="password"
              value={data.password}
              name="password"
              placeholder="Enter password"
              className={errors.password && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.password}
            />

            <Input
              type="password"
              value={data.confirmPassword}
              name="confirmPassword"
              placeholder="Confirm password"
              className={errors.confirmPassword && 'has-validation-error'}
              onChange={this.handleChange}
              onFocus={this.clearErrorMessages}
              error={errors.confirmPassword}
            />

            {errors.signup && (
              <div className="form-field signup-error">
                <span>{errors.signup}</span>
              </div>
            )}

            <div className="form-field">
              <Button
                className="btn"
                title="Please fill up the form"
                label={signup.isLoading ? 'Please wait...' : 'Submit'}
                disabled={signup.isLoading}
              />
            </div>
          </Form>

          <div className="Signup__form__footer">
            <div className="social-signup">
              <SocialLogin />
            </div>

            <p>
              Have an account?&nbsp;
              <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </main>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  signup: PropTypes.object.isRequired,
  signupAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ signup }) => ({ signup });

export default connect(
  mapStateToProps,
  { signupAction }
)(Signup);
