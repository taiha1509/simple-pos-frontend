
import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { chooseCustomer } from '../actions/CustomerAction';

const AddCustomer = (props) => {
    const { Search } = Input;

    const [keySearch, setKeySearch] = useState('');

    const handleOk = () => {
        props.setIsModalVisiblle(false);
    }

    const handeCancle = () => {
        props.setIsModalVisiblle(false);
    }

    const onSearch = (value, event) => {
        setKeySearch(value);
    }

    const onChange = (e) => {
        const value = e.target.value;
        if (value == '')
            setKeySearch('');
    }

    const chooseCustomer = (customer) => {
        props.choooseCustomer(customer);
        props.setIsModalVisiblle(false);
    }

    return (
        <>
            <Modal
                visible={props.isModalVisible}
                onOk={handleOk}
                onCancel={handeCancle}
                width={375}
            >
                <br />
                <Search placeholder="input search text" onSearch={onSearch} style={{ marginTop: "10px" }} onChange={onChange} />
                <br />
                {props.list_customer.map((value, index) => {
                    if (keySearch) {
                        if (value.firstname.includes(keySearch) || value.lastname.includes(keySearch)) {
                            return (
                                <a onClick={() => chooseCustomer(value)} key={value.id}><p>{value.firstname + ' ' + value.lastname}</p></a>
                            )
                        }
                    } else {
                        return (
                            <a onClick={() => chooseCustomer(value)} key={value.id}><p>{value.firstname + ' ' + value.lastname}</p></a>
                        )
                    }
                })}
            </Modal>
        </>
    );

}

const mapStateToProps = (state, ownProps) => {
    return {
        list_customer: state.customer.data.items,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        choooseCustomer: (customer) => dispatch(chooseCustomer(customer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);