import React from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import MainStore from '../../stores/MainStore.js';
import MainActions from '../../actions/MainActions';

const getStateFromStores = () => {
  return {
    feed: MainStore.getFeed()
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getStoreData();
  }

  componentDidMount() {
    MainStore.addChangeListener(this._onChange);
  };

  componentWillUnmount() {
    MainStore.removeChangeListener(this._onChange);
  };

  _onChange = () => {
    this.setState({ feed: MainStore.getFeed() });
  }

  getStoreData = () => {
    let _state = this.state;

    const newData = { 
      feed: MainStore.getFeed()
    }

    _state = Object.assign({}, _state, newData);

    return _state;
  }

  add = () => {
    MainActions.addSecond();
  };

  render() {
    return (
      <div>
        <p>Main Feed</p> 
        <button onTouchTap={ this.add }>Add Second</button>
        <div>
          { this.state.feed.map((obj, i) => {
            return <p key={ i }>{obj.title}</p>
          })}
        </div>
      </div>
    )
  }
}

export default Main;
