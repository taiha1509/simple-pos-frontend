
import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const AddCustomer = ({ isModalVisible, setIsModalVisiblle }) => {
    const {Search} = Input;
    const handleOk = () => {
        setIsModalVisiblle(false);
    }

    const handeCancle = () => {
        setIsModalVisiblle(false);
    }

    const onSearch = () => {

    }

    return (
        <>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handeCancle}
                width={375}
            >
                <Button type='primary' onClick={() => {}}>Create Customer</Button>
                <Search placeholder="input search text" onSearch={onSearch} style={{marginTop: "10px"}}/>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );

}

export default AddCustomer;