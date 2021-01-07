import { Grid, Row, Col,Form, Input, Button, Checkbox } from 'antd';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import {login} from '../actions/StaffAction';

const Login = ({login}) => {
    
    const [cookies, setCookies, removeCookies] = useCookies(['isLogin, staff']);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const LoginForm = () => {
        const onFinish = values => {
            setEmail(values.username);
            setPassword(values.password);
            console.log('Success:', values);
            login(values.username, values.password);

        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        LOGIN
              </Button>
                </Form.Item>
            </Form>
        );
    };

    return (
        <Row>
            <Col span={9} >
            </Col>
            <Col span={6} className='login'>
                <img src='/icon-login.png' style={{width: + '80', marginTop: + '200'}}></img>
                <br />
                <br />
                <h2>Login</h2>
                <br></br>
                <LoginForm/>
            </Col>
            <Col span={9} >
            </Col>
        </Row>
    );
}

const mapStateToProps = (state, ownProps) => {
    return{

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email, password) => dispatch(login({
            email: email,
            password: password
        }))
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);