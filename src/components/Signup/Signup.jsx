import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import signupInputSchema from '../../schemas/signup';
import signupUser from '../../actions/user/signup';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import GoogleIcon from '../../../assets/icon/google.png';
import TwitterIcon from '../../../assets/icon/twitter.png';
import FacebookIcon from '../../../assets/icon/facebook.png';
import './Signup.scss';

const initialData = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

/**
 *
 *
 * @export
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {
  state = {
    data: { ...initialData },
    errors: {},
  };

  getValidationErrorMessages = (error) => {
    const validationErrors = {};
    const errorDetails = error.details;

    for (let i = errorDetails.length - 1; i >= 0; i -= 1) {
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
      signupStatus: { reason },
    } = this.props;

    const errorsClone = { ...errors };
    errorsClone.signup = reason;
    this.setState({ errors: errorsClone });
  };

  redirectUserToProfilePage = () => {
    const {
      history: { push },
    } = this.props;
    push('/profile');
  };

  handleChange = ({ target: input }) => {
    const { data } = this.state;
    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    this.setState({ data: dataClone });
  };

  clearErrorMessages = ({ target: input }) => {
    const errors = { ...this.state.errors };
    errors[input.name] = '';
    this.setState({ errors });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = this.validateInputs();
    this.setState({
      errors: validationErrors || {},
    });

    if (validationErrors) return null;

    await this.props.signupUser(this.state.data);

    const {
      signupStatus: { status },
    } = this.props;
    if (status === 'failed') this.renderSignupError();
    if (status === 'completed') this.redirectUserToProfilePage();
  };

  /**
   *
   *
   * @returns
   * @memberof Signup
   */
  render() {
    const { data, errors } = this.state;
    const { signupStatus } = this.props;

    return (
      <>
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
                  label="Submit"
                  disabled={signupStatus.status === 'processing'}
                />
              </div>
            </Form>

            <div className="Signup__form__footer">
              <div className="social-signup">
                Continue with:
                <span className="social-icons">
                  <img src={FacebookIcon} alt="Facebook Icon" />
                </span>
                <span className="social-icons">
                  <img src={GoogleIcon} alt="Google Icon" />
                </span>
                <span className="social-icons">
                  <img src={TwitterIcon} alt="Twitter Icon" />
                </span>
              </div>

              <p>
                Have an account?&nbsp;
                <Link to="/login">Login</Link>
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }
}

Signup.propTypes = {
  signupStatus: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({ signupStatus }) => ({ signupStatus });

export default connect(
  mapStateToProps,
  { signupUser }
)(Signup);