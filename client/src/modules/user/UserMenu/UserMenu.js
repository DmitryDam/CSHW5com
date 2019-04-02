import React, { Component, createRef } from 'react';
import Dropdown from './Dropdown/Dropdown';
import Avatar from '../Avatar/Avatar';
import s from './UserMenu.module.css';

export default class UserMenu extends Component {
  containerRef = createRef();

  state = {
    isDropdownOpen: false,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleWindowClick);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isDropdownOpen } = this.state;

    return nextState.isDropdownOpen !== isDropdownOpen;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  handleWindowClick = e => {
    const isTargetInsideContainer = this.containerRef.current.contains(
      e.target,
    );
    const { isDropdownOpen } = this.state;

    if (isDropdownOpen && !isTargetInsideContainer) {
      this.closeDropdown();
    }
  };

  openDropdown = () => {
    this.setState({ isDropdownOpen: true });
  };

  closeDropdown = () => {
    this.setState({ isDropdownOpen: false });
  };

  // closeDropdown = () => {
  //   this.setState(prevstate => ({ isDropdownOpen: !prevstate.isDropdownOpen }));
  // };

  // consolHand = () => {
  //   console.log('55555555555555555555');
  // };

  render() {
    const { isDropdownOpen } = this.state;
    const { name, avatar } = this.props;

    return (
      <div
        className={s.container}
        onClick={this.openDropdown}
        ref={this.containerRef}
      >
        <Avatar image={avatar} />
        <span className={s.name}>{name}</span>
        {isDropdownOpen && (
          <Dropdown
            /* consol={this.consolHand} */ closeDropdown={this.closeDropdown} openDropdown={this.openDropdown}
          />
        )}
      </div>
    );
  }
}
