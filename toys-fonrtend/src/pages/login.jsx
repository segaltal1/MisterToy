import React from 'react'
import { connect } from 'react-redux'
import { onLogin, onSignup } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'


import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

class _Login extends React.Component {
    state = {
        isSignup: false
    }
    componentDidMount() {
        // if (this.props.user) this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required username';
        }
        if (!values.password) {
            errors.password = 'Required password';
        }
        if (this.state.isSignup && !values.fullname) {
            errors.fullname = 'Required fullname';
        }
        return errors;
    }

    onFormSubmit = (values, { setSubmitting }) => {
        if (this.state.isSignup) {
            this.props.onSignup(values)
                .then(res => {
                    setSubmitting(false);
                    (!res) ? showErrorMsg('User already exists') : this.props.history.push('/')
                })
        } else {
            this.props.onLogin(values)
                .then(res => {
                    setSubmitting(false);
                    this.props.history.push('/toy')
                })
                .catch(err => {
                    showErrorMsg('Wrong credentials')
                })
        }
    }


    render() {
        const { isSignup } = this.state;
        const initialValues = { fullname: '', username: '', password: '' }
        const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />

        return (
            <section className="login-page flex column gap align-center ">

                <div className="login-section">
                    <h1>Enter your credentials</h1>
                    <Formik
                        initialValues={initialValues}
                        validate={this.validate}
                        onSubmit={this.onFormSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {isSignup && <><Field type="text" name="fullname" label="fullname" as={TextFieldOutlined} />
                                    <ErrorMessage name="fullname" component="div" /></>}
                                <Field type="text" name="username" label="username" as={TextFieldOutlined} autoComplete="username" />
                                <ErrorMessage name="username" component="div" />
                                <Field type="password" name="password" label="password" as={TextFieldOutlined} autoComplete="current-password" />
                                <ErrorMessage name="password" component="div" />
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    type="submit"
                                    disabled={false}>
                                    {!isSignup ? 'Login' : 'Signup'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <p>Don't have an acount?
                        <button className="btn-signup" onClick={this.toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                    </p>
                </div>
            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
}



export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)