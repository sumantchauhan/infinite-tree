import React, { Component } from 'react';
import { initTreeData1 } from './initTreeData1';
import Modals from './Modals';
import { Tree } from 'antd';

class AddrollsDemo extends Component {

    constructor(props){
        super(props);
        this.state = {
            initialData:initTreeData1,
            selectedData:'',
            showModal:false,
            inputValue:'',
            modalInputLabel:'',
            selectedKeys:[]
        }
    }

    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedData:info.node,
            showModal:true,
            modalInputLabel:info.node.title,
            selectedKeys:selectedKeys
        });
      }

    handleCancel = () => {
        this.setState({showModal:false})
    }

    handleOk = e => {
        this.dataChange(this.state.selectedData) 
        this.setState({showModal:false})
    };

    handleChange = (data) =>{
      console.log("calling",data);
      this.setState({inputValue:data.value})
    }

    dataChange = (node) => {
        let DataTree = this.state.initialData; 
        const loop = (data, key, callback) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].key === key) {
              return callback(data[i], i, data);
            }
            if (data[i].children) {
              loop(data[i].children, key, callback);
            }
          }
        };
      
      let obj = {
        title : this.state.inputValue,
        key : `${node.key}-${node.children.length}`,
        children:[]
      }
      
        loop(DataTree, node.key , (item, index, arr) => {
         item.children = item.children || []
         item.children.push(obj)
        });

        this.setState({initialData:DataTree})
      }

    render() {
        return (
            <>
            <Tree
                treeData={this.state.initialData}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
                defaultExpandAll={true}
                selectable={true}
                autoExpandParent={true}
            />
            {
                this.state.showModal ? (
                <Modals 
                    handleOk={this.handleOk}
                    handleCance={this.handleCancel} 
                    modalInputData={this.state.modalInputLabel}
                    handleChange={this.handleChange} 
                    />) : ""
            }
            </>
        )
    }
}

export default AddrollsDemo
