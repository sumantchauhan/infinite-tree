import React from 'react';
import { Modal, Input } from 'antd';

function Modals(props) {

      const handleOk = e => {
        props.handleOk(props.modalInputData);
      };
    
      const handleCancel = e => {
        props.handleCance()
      };

    return (
        <div>
        <Modal
          title="Basic Modal"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         <Input 
            placeholder="Enter node name" 
            onChange = {(e) => props.handleChange(e.target.value)}
            type={'text'}
            width={'24vw'}
          />
         <br/>
         <div className="selectedlabel">
             {props.modalInputData ? props.modalInputData : ''}
         </div>
        </Modal>
        </div>
    )
}

export default Modals;
