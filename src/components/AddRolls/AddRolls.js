import React,{useState} from 'react';
import 'antd/dist/antd.css';
import './AddRolls.css';
import ShowTreeNode from './ShowTreeNode';
import { initTreeData } from './initTreeData';




function AddRolls() {
    const [newName,setNewName] = useState('');
    const [adminData,setAdminData] = useState([
        {
            id:0,
            label:'director',
            name:'Director',
            children:[
                {
                    id:0,
                    label:'operation',
                    name:'Operation',
                    children:[]
                }
            ]
        },
        {
            id:1,
            label:'ceo',
            name:'CEO',
            children:[
                {
                    id:0,
                    label:'manager',
                    name:'Manager',
                    children:[
                        {
                            id:0,
                            label:'jrmanager',
                            name:'Junior Manager',
                            children:[]
                        }
                    ]
                },
                {
                    id:1,
                    label:'salesmanager',
                    name:'Sales Manager',
                    children:[]
                }
            ]
        },
        {
            id:2,
            label:'vp',
            name:'VP',
            children:[]
        }
    ]);

    const handleOk = data => {
        if(data.child1){
            addNestedNode(data);
        }if(data.child1 && data.child2){
            addNestedNode(data);
        }else if(!data.child1 && !data.child2){
            console.log("else if calling")
            let newNodeItem = adminData;
            let newData = addNewTreeNode(newNodeItem,data);
            setAdminData(newData);
        }
    };

    const addNestedNode = treeData => {
        let data = adminData;
        for(let i=0;i<data.length;i++){
            if(data[i].id === treeData.data.id){
                for(let j=0;j<data[i].children.length;j++){
                    if(data[i].children[j].id === treeData.child1.id){
                        let newNode = {
                            id: data[i].children[j].children.length > 0 ? data[i].children[j].children.length + 1 : 0,
                            label:newName.toLocaleLowerCase(),
                            name:newName,
                            children:[]
                        }
                        data[i].children[j].children.push(newNode) 
                    break;
                    }
                }
                break;
            }
        }
    }

    const addNewTreeNode = (adminData,treeData) => {
        let _data = adminData.map(data => {
            if(data.id === treeData.data.id){
                if(data.children.length>0){
                    let newNode = {
                        id:data.children.length+1,
                        label:newName.toLocaleLowerCase(),
                        name:newName,
                        children:[]
                    }
                    data.children.push(newNode);
                }else{
                    let newNode = {
                        id:0,
                        label:newName.toLocaleLowerCase(),
                        name:newName,
                        children:[]
                    }
                    data.children.push(newNode);
                }
            }
            return data;
        });
        return _data;
    }

    const handleCancel = e => {
    };

    const handleChange = (data) => {
        setNewName(data.value);
    }


    return (
        <div>
            <div className="accessheader">Admin</div>
            <ShowTreeNode members={initTreeData}/>
        </div>
    )
}

export default AddRolls;
