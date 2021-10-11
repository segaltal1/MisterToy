import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import { toyService } from "../services/toy.service.js";
import { onEditToy } from '../store/toy.actions'
import { Loader } from '../cmps/laoder.jsx';

class _ToyEdit extends React.Component {
    state = {
        name: '',
        price: '',
        inStock: '',
        _id: ''
    }
    componentDidMount() {
        const { user } = this.props
        const toyId = this.props.match.params.toyId;
        if (!toyId || !user.isAdmin) {
            this.props.history.push('/');
            return;
        }
        toyService.getById(toyId)
            .then(toy => {
                console.log('toy from server:', toy);
                this.setState({ ...toy })
                console.log('edit state:', this.state);
            })
    }
    onEditToy = (ev = null) => {
        if (ev) ev.preventDefault();
        if (!this.state.name || !this.state.price) return;
        const toy = { ...this.state }
        toy.price = +toy.price
        this.props.onEditToy(toy);
        this.props.history.push(`/toy/details/${toy._id}`);
    }


    validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!values.price || values.price < 0) {
            errors.price = 'Invalid price'
        }
        return errors;
    }

    onFormSubmit = (values, { setSubmitting }) => {
        const toy = { ...values }
        const savedToy = { ...this.state }
        savedToy.price = toy.price
        savedToy.name = toy.name
        toy._id = this.state._id
        this.props.onEditToy(savedToy);
        this.props.history.push(`/toy/details/${this.state._id}`);
    }

    TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'secondary'} />
    render() {
        const { name, price } = this.state;
        if (!name) return <Loader />
        const initialValues = { name, price }

        return (
            <div className="toy-edit flex align-center justify-center gap column">
                <h1>Edit You Toy</h1>
                <Formik
                    initialValues={initialValues}
                    validate={this.validate}
                    onSubmit={this.onFormSubmit}

                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="name" name="name" label="name" as={this.TextFieldOutlined} />
                            <ErrorMessage name="name" component="div" />
                            <Field type="number" name="price" label="price" as={this.TextFieldOutlined} />
                            <ErrorMessage name="price" component="div" />
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                type="submit"
                                disabled={isSubmitting}>
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

//ASKING FROM GLOABAL STATE
function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onEditToy
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)
