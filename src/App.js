import React, {useEffect, useState} from 'react';

function App() {
  const [textValue, setTextValue] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("myNote"));
    if(data){console.log(data);
      setTaskList(data)
    }
  },[])

  const handleSave = () => {
    if(textValue) {
      let temp = [...taskList];
      temp.push(textValue);
      setTaskList(temp);
      setTextValue('');
    }
  }


  const handleDeleteTask = (task) => {
    taskList.forEach((el, index) => {
      if(el === task) {
        let temp = [...taskList];
        temp.splice(index, 1);
        setTaskList(temp);
      }
    });
  }

  const handleDeleteAll = () => {
    let temp = [...taskList];
    temp = [];
    setTaskList(temp);
  }

  const remember = () => {
    localStorage.clear();
    localStorage.setItem('myNote', JSON.stringify(taskList))
  }

  return (
    <div>
      <input type="text"  placeholder='type task here' value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
      <div></div>
      {
        taskList && taskList.length > 0 && taskList.map((task, index) => (
          <div key={index} style={{display:'flex'}}>
            <h2>{task}</h2>
            <button onClick={() => handleDeleteTask(task)}>delete</button>
          </div>
        ))
      }
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => handleDeleteAll()}>Delete All</button>
      <button onClick={() => remember()}>Remember</button>
    </div>
  );
}

export default App;