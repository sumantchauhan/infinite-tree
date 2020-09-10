import React, { useState } from 'react';
import Modals from './Modals';

function ShowDynamicTree(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalInput, setModalInput] = useState('');

    const handelShowModal = (data, child1) => {
        setShowModal(true)
        let inputData = {
            data: data,
            child1: child1
        };
        setModalInput(inputData);
    };

    const handelShowChildModal = (data, child1) => {
        setShowModal(true)
        let inputData = {
            data: data,
            child1: child1
        };
        setModalInput(inputData);
    }

    const handelShowChild1Modal = (data, child1, child2) => {
        setShowModal(true)
        let inputData = {
            data: data,
            child1: child1,
            child2: child2
        };
        setModalInput(inputData);
    }

    const handleOk = e => {
        setShowModal(false);
        props.handleOk(e);
    };

    const handleCancel = e => {
        setShowModal(false)
        props.handleCancel(e);
    };

    return (
        <>
            {
                props.treeData.map(data => (
                    <div key={data.id}>
                        {
                            data.children.length > 0 ? (
                                <>
                                    <div className="rollsaccesname" onClick={() => handelShowModal(data)}>
                                        {
                                            data.name
                                        }
                                    </div>
                                    {data.children.map(child1 => (
                                        <div key={child1.id}>
                                            {
                                                child1.children.length > 0 ? (
                                                    <>
                                                        <div
                                                            className="rollsaccesname childitem"
                                                            onClick={() => handelShowChildModal(data, child1)}
                                                        >{child1.name}</div>
                                                        {
                                                            child1.children.map(child2 => (
                                                                <div
                                                                    key={child2.id}
                                                                    className="rollsaccesname childitem1"
                                                                    onClick={() => handelShowChild1Modal(data, child1, child2)}
                                                                >{child2.name}</div>
                                                            ))
                                                        }
                                                    </>
                                                ) : (
                                                        <div
                                                            className="rollsaccesname childitem"
                                                            onClick={() => handelShowChildModal(data, child1)}
                                                        >{child1.name}</div>
                                                    )
                                            }
                                        </div>
                                    ))}
                                </>
                            ) : (
                                    <div className="rollsaccesname" onClick={() => handelShowModal(data)}>
                                        {data.name}
                                    </div>
                                )
                        }
                    </div>
                ))
            }
            {
                showModal ? (<Modals handleOk={handleOk}
                    handleCance={handleCancel} 
                    modalInputData={modalInput} 
                    handleChange={props.handleChange} />) : ""
            }
        </>
    )
}

export default ShowDynamicTree;
