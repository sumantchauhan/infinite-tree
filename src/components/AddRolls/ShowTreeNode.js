import React,{Component} from 'react';
import  Tree  from './Tree';
import { initTreeData } from './initTreeData';
import Modals from './Modals';

class ShowTreeNode extends Component {
    constructor(props){
        super(props);
        this.state = {
            initialData:initTreeData,
            selectedData:'',
            showModal:false,
            inputValue:'',
            modalInputLabel:''
        }
    }

    handelClick = (data) => {
        this.setState({
          selectedData:data,
          showModal:true,
          modalInputLabel:data.title
        });
    }

    handleCancel = () => {
        this.setState({showModal:false})
    }

    hasChildren = (member) => {
        return member.children && member.children.length > 0 ? true : false;
    }

    handleOk = e => {
        this.dataChange(this.state.selectedData) 
        this.setState({showModal:false})
    };

    handleChange = (data) =>{
      this.setState({inputValue:data})
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
        key : Math.floor(Math.random() * Math.floor(5000)),
        children:[],
      }
      
        loop(DataTree, node.key , (item, index, arr) => {
         item.children = item.children || []
         item.children.push(obj)
        });
    
        this.setState({initialData:DataTree})
      
      }

    render(){
        return (
            <div style={{paddingLeft:'10px'}}>
                {
                this.props.members.map((member,i) => {
                    return(
                    <div key={member.key}>
                        <Tree member={member} handelClick={this.handelClick}/>
                        <div style={{marginLeft:'15px'}}>
                        {this.hasChildren(member) && <ShowTreeNode members={member.children}/>}
                        </div>
                    </div>
                    )
                })
                }
                {
                    this.state.showModal ? (
                        <Modals 
                        handleOk={this.handleOk}
                        handleCance={this.handleCancel} 
                        modalInputData={this.state.modalInputLabel}
                        handleChange={this.handleChange} 
                        />) : ""
                }
                </div>
        )
    }
}

export default ShowTreeNode
