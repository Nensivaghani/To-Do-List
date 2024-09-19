import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Todoapp = () => {
    const [iscomplete, setIscomplete] = useState(false);
    const [todo, setTodo] = useState([]);
    const [newtitle, setNewtitle] = useState("");
    const [newdescription, setNewdescription] = useState("");
    const [completed, setCompleted] = useState([]);
    const [currentedit, setCurrentEdit] = useState([]);
    const [currentEditdItem, setCurrentEditItem] = useState([]);

    const handleAddTodo = () => {
        //1 add item and useing map funtion:
        let newTodoItem = {
            title: newtitle,
            description: newdescription
        }
        let updateTodoItem = [...todo];
        updateTodoItem.push(newTodoItem);
        setTodo(updateTodoItem);
        // localStorage.setItem('todolist',updateTodoItem)
        localStorage.setItem('todolist', JSON.stringify(updateTodoItem))

    }

    //3 deleteitem: 
    const handleDelete = (index) => {
        let reduceTodo = [...todo];
        reduceTodo.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(reduceTodo));
        setTodo(reduceTodo)


    }
    const handleDeleteCompleted = (index) => {
        let reduceTodo = [...completed];
        reduceTodo.splice(index, 1);
        localStorage.setItem('completed', JSON.stringify(reduceTodo));
        setCompleted(reduceTodo)

    }


    // 4 complete or not item:
    const handlecomplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedon = dd + '-' + mm + yyyy + 'at' + h + ':' + m + ':' + s;

        let filteredItem = {
            ...todo[index],
            completedon: completedon
        }
        let updatecompleteItem = [...completed];
        updatecompleteItem.push(filteredItem);
        setCompleted(updatecompleteItem);
        handleDelete(index);
        localStorage.setItem('completed', JSON.stringify(updatecompleteItem));


    }

    //2 store to localStorage:
    useEffect(() => {
        let saveTodo = JSON.parse(localStorage.getItem('todolist'));
        let savecompleted = JSON.parse(
            localStorage.getItem('completeds')
        );
        if (saveTodo) {
            setTodo(saveTodo);
        }
        if (savecompleted) {
            setCompleted(savecompleted);
        }
    }, [])

    // 5 currentitem update:
    const handleEdit = (index, item) => {
        console.log(index);
        setCurrentEdit(index);
        setCurrentEditItem(item);

    }
    const handleUpadateTitle = (value) => {
        setCurrentEditItem((prev)=>{
return{...prev,title:value}
        })

    }
    const handleUpadateDescription = (value) => {
        setCurrentEditItem((prev)=>{
            return{...prev,description:value}
                    })

    }
    const handleUpdateTodo =()=>{

        let newTodo=[...todo];
        newTodo[currentedit]=currentEditdItem;
        localStorage.setItem('todolist', JSON.stringify(newTodo));
        setTodo(newTodo);
        setCurrentEdit("");
    }



    return (
        <>
            <div className="todo-main">
                <h1>My Todos</h1>
                <div className="todo-inner">
                    <div className="item">
                        <div className='item-inner'>
                            <label htmlFor="">Title </label>
                            <input type="text" name='text' value={newtitle} onChange={(e) => setNewtitle(e.target.value)} placeholder="what's the task title?" />
                        </div>
                        <div className='item-inner'>
                            <label htmlFor="">Description </label>
                            <input type="text" name='text' value={newdescription} onChange={(e) => setNewdescription(e.target.value)} placeholder="what's the task description?" />
                        </div>
                        <div className='item-inner'>
                            <button type='button' onClick={handleAddTodo} className='add-btn'>add</button>
                        </div>
                    </div>
                    <div className="btn-content">
                        <button className={`todo-btn ${iscomplete === false && 'active'} `} onClick={() => setIscomplete(false)}>Todo</button>
                        <button className={`todo-btn ${iscomplete === true && 'active'} `} onClick={() => setIscomplete(true)}>Compaletd</button>
                    </div>
                    <div className="todo-list">
                        {
                            iscomplete === false && todo.map((item, index) => {
                                if (currentedit === index) {
                                    return (
                                        <div className="currentedit" key={index}>
                                            <input type="text"
                                                placeholder='updated Title'
                                                onChange={(e) => handleUpadateTitle(e.target.value)}
                                                value={currentEditdItem.title} />
                                            <textarea type="text"
                                                placeholder='updated Title'
                                                onChange={(e) => handleUpadateDescription(e.target.value)}
                                                value={currentEditdItem.description} />
                                            <button type='button' onClick={handleUpdateTodo} className='update'>Update</button>

                                        </div>
                                    )

                                }
                                else {

                                    return (
                                        <div className="todo-item" key={index}>
                                            <div className="text">
                                                <h3> {item.title}</h3>
                                                <p>{item.description}</p>
                                            </div>

                                            <div className="icon">
                                                <span onClick={() => handleEdit(index, item)} title='update..?'><BsFillPencilFill /></span>
                                                <span onClick={() => handleDelete(index)} title='delete..?'>  <MdDelete /> </span>
                                                <span onClick={() => handlecomplete(index)} title='completed'>  <FaCheck />  </span>
                                            </div>
                                        </div>
                                    )

                                }
                            })
                        }
                        {
                            iscomplete === true && completed.map((item, index) => {
                                return (
                                    <div className="todo-item" key={index}>
                                        <div className="text">
                                            <h3> {item.title}</h3>
                                            <p>{item.description}</p>
                                            <p><small>completed on:{item.completedon}</small></p>
                                        </div>

                                        <div className="icon">
                                            <span><BsFillPencilFill /></span>
                                            <span onClick={() => handleDeleteCompleted(index)}>  <MdDelete /> </span>
                                            {/* <span onClick={() => handlecomplete(index)}>  <FaCheck />  </span> */}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div >


        </>
    )
}

export default Todoapp