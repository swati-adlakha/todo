import React from 'react';
import {connect} from 'react-redux';
import {addDataStart, getDataStart, deleteDataStart, editDataStart} from '../../store/actions/todo';
import './todo.scss';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      activeNav: 'all'
    };
    this.inputRef = React.createRef();
  }

  componentWillMount() {
    this.props.getDataStart();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.todo !== nextProps.todo) {
      if (this.props.todo.add !== nextProps.todo.add) {
        if (nextProps.todo.add.apiStatus === 'success') {
          this.setState({input: ''})
        }
      }
    }
  }

  handleAdd = () => {
    const {input} = this.state;
    if (input !== '') {
      this.props.addDataStart({task_name: input});
    }
    else {
      this.inputRef.current.focus();
    }
  };

  handleChange = (e) => {
    this.setState({input: e.target.value})
  };

  selectNav = nav => {
    this.setState({activeNav: nav});
  };

  filterNotes = () => {
    let notes = [];
    const {activeNav} = this.state;
    const data = this.props.todo.notes.data;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (activeNav === 'active') {
        if (!item.done && item.active) notes.push(item);
      }
      else if (activeNav === 'done') {
        if (item.done && item.active) notes.push(item);
      }
      else {
        notes.push(item);
      }
    }
    return notes;
  };

  getPendingNotes = () => {
    let count = 0;
    const data = this.props.todo.notes.data;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].done && data[i].active) count++;
    }
    return count;
  };

  handleUpdate = item => {
    this.props.editDataStart({id: item.id, done: !item.done});
  }

  handleDelete = item => {
    this.props.deleteDataStart({id: item.id, active: false});
  }

  render() {
    const {input, activeNav} = this.state;
    const {todo} = this.props;
    console.log('todo.notes', todo.notes);
    if (todo.notes.data !== null) {
      const notes = this.filterNotes();
      return (
        <div className='todo'>
          <div className='input'>
            <input ref={this.inputRef} value={input} onChange={this.handleChange} placeholder='Add new note...'/>
            <button onClick={this.handleAdd}>Add</button>
          </div>
          <div className='filter'>
            <div className='box'>
              <button
                className={activeNav === 'all' ? 'nav active' : 'nav'}
                onClick={() => this.selectNav('all')}
              >
                All
              </button>
              <button
                className={activeNav === 'active' ? 'nav active' : 'nav'}
                onClick={() => this.selectNav('active')}
              >
                Active
              </button>
              <button
                className={activeNav === 'done' ? 'nav active' : 'nav'}
                onClick={() => this.selectNav('done')}
              >
                Done
              </button>
            </div>
          </div>
          {todo.add.apiStatus === 'started' && <div className='loading'>Adding note...</div>}
          {todo.delete.apiStatus === 'started' && <div className='loading'>Deleting note...</div>}
          {todo.edit.apiStatus === 'started' && <div className='loading'>Updating note...</div>}
          <div className='list'>
            {notes.map((item, index) => {
              if (item.active) {
                return (
                  <div key={item.id} className={item.done ? 'item item_done' : 'item'}>
                    <img src={item.done ? './img/success.png' : './img/oval.png'} 
                       onClick={() => this.handleUpdate(item)}/>
                    <span>{item.task_name}</span>
  
                    <button className='delete' 
                    onClick={() => this.handleDelete(item)}>
                      <img src='./img/cross-out.png'/>
                    </button>
                  </div>
                )
              }
              else return null;
            })}
          </div>
          <div className='footer'>
            {`${this.getPendingNotes()} notes pending`}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='todo'>
          <div className='loading'>Fetching notes...</div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo
  };
};

export default connect(mapStateToProps, {getDataStart, addDataStart, deleteDataStart, editDataStart})(Todo);