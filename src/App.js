import './App.css';
import React,{useState} from 'react'
import Table from './component/Table.js'
import AddWork from './component/Add';

function App() {
  const [works,setworks]=useState(localStorage && localStorage.getItem('ws')?JSON.parse(localStorage.getItem('ws')):[]);
  const [addButton,setaddButton]=useState(false);
  const [findText, setFindText]=useState("");

  function componentWillMount(str){
    if(localStorage && localStorage.getItem(str)){
        var ws=JSON.parse(localStorage.getItem(str));
        setworks(ws);
    }
  }
  
  function setAddForm()
  {
    setaddButton(!addButton);
  }
  function handleSubmit(work,status)
  {
    const New={work:work,status:status};  
    works.push(New);
    setaddButton(!addButton);
    localStorage.setItem('ws', JSON.stringify(works));
    componentWillMount('ws');
  }

  function deleteItem(item)
  {
    const NewValue=works;
    NewValue.splice(item,1);
    localStorage.setItem('ws', JSON.stringify(NewValue));
    componentWillMount('ws');
  }

  function fixItem(index,item)
  {
    const NewValue=works;
    NewValue.splice(index,1);
    NewValue.splice(index,0,item);
    localStorage.setItem('ws', JSON.stringify(NewValue));
    componentWillMount('ws');
  }

  function changeSortValue(event)
  {
    const value=event.target.value;
    if (Number(value)===1)
    {
      let NewValue=works;
      let result1 = NewValue.filter((item) => Number(item.status) ===1);
      let result2 = NewValue.filter((item) => Number(item.status) ===0);
      let result=result1.concat(result2);
      localStorage.setItem('ws', JSON.stringify(result));
      componentWillMount('ws');
    }
    if (Number(value)===2)
    {
      let NewValue=works;
      let result1 = NewValue.filter((item) => Number(item.status) ===1);
      let result2 = NewValue.filter((item) => Number(item.status) ===0);
      let result=result2.concat(result1);
      localStorage.setItem('ws', JSON.stringify(result));
      componentWillMount('ws');
    }
    if (Number(value)===3)
    {
      let NewValue=works;
      NewValue.sort((a, b) => a.work.localeCompare(b.work));
      localStorage.setItem('ws', JSON.stringify(NewValue));
      componentWillMount('ws');
    }
    if (Number(value)===4)
    {
      let NewValue=works;
      NewValue.sort((a, b) => b.work.localeCompare(a.work));
      localStorage.setItem('ws', JSON.stringify(NewValue));
      componentWillMount('ws');
    }
  }
  function backHome()
  {
      componentWillMount('ws');
  }
  function findChange(event)
  {
    const target=event.target;
    const name=target.name;
    const value=target.value;
    name==="find" && setFindText(value);
  }

  function findButtonClick()
  {
    componentWillMount('ws')
    let NewValue=works;
    let result1 = NewValue.filter((item) => item.work.toUpperCase().search(findText.toUpperCase()) >=0);
    localStorage.setItem('find', JSON.stringify(result1));
    componentWillMount('find')
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h1 className="text-center text-success">ToDo App</h1>
        </div>
      </div>
      <div className="row">
        {addButton&&
        
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 add">
            <button type="button" className="closeAdd btn bg-transparent" onClick={setAddForm}>    
              <i className="fas fa-window-close addIcon"></i>
            </button> 
            <AddWork change={handleSubmit}/>
          </div>
        }
        <div className={addButton?"col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"}>
          <div className="row">
            {!addButton &&
              <button type="button" className="btn btn-info btn-sm control" onClick={setAddForm}>
                Thêm công việc
              </button>
            }
            <select 
                  className="form-control col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 control" 
                  name="sort"
                  style={{marginLeft:'1%'}}
                  onChange={changeSortValue}>
                <option value={0}>Sắp xếp</option>
                <option value={1}>Quan trọng</option>
                <option value={2}>Không quan trọng</option>
                <option value={3}>{"A->Z"}</option>
                <option value={4}>{"Z->A"}</option>
            </select>
            <input 
                  className="form-control col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 control"
                  placeholder="Tìm kiếm"
                  style={{marginLeft:'1%'}}
                  onChange={findChange}
                  name="find"/>
            <button type="button" className="btn btn-info btn-sm control" onClick={findButtonClick}>
                Tìm kiếm
            </button>
            <button type="button" className="btn bg-transparent home" onClick={backHome}>    
              <i className="fas fa-home"></i>
            </button> 

          </div>
          <Table work={works} index={deleteItem} fix={fixItem}/>
        </div>
      </div>
    </div>
  );
}

export default App;
