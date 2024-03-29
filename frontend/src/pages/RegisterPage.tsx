import React from 'react';
import { connect } from 'react-redux';

import { addUser } from './../reducers/actions/userActions';

import { RootState } from '../reduxStore';
import RegisterForm from './../forms/RegisterForm';

interface Props {
    addUser: any;
    token: string;
    isRegistering: boolean;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordAgain: string;
    userPermission: boolean;
}

export class RegisterPage extends React.Component<Props> {
    public handleSubmit = (values: FormValues) => {
        this.props.addUser(
            {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                password: values.password,
            },
            this.props.token,
        );
    };

    public render() {
        return (
            <React.Fragment>
                <h1>Register</h1>
                <RegisterForm onSubmit={this.handleSubmit} isRegistering={this.props.isRegistering} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isRegistering: state.user.isRegistering,
});

const mapDispatchToProps = {
    addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
