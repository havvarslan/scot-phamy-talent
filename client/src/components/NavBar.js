import React, { Component } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SideBarMenu from "./SideBar";
class NavBar extends Component {
  state = {
    visible: false,
    activeItem:
      window.location.pathname === "/"
        ? "home"
        : window.location.pathname.substr(1)
  };
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, visible: false });

  logout = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    document.location.reload();
  };
  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () =>
    this.setState(prevState => {
      const visibleState = prevState.visible;
      return {
        visible: !visibleState
      };
    });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible, activeItem } = this.state;
    const { handleSidebarHide, handleItemClick, logout } = this;
    return (
      <React.Fragment>
        <Menu inverted>
          <Menu.Item>
            <Button disabled={visible} onClick={this.handleShowClick}>
              <Icon name="list layout"></Icon>
            </Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Header as="h5">{activeItem}</Menu.Header>
          </Menu.Item>
          {localStorage.getItem("token") ? (
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={event => {
                this.logout(event);
                handleItemClick(event);
              }}
              as={Link}
              position="right"
              to="/logout"
            >
              <Button primary> Logout</Button>
            </Menu.Item>
          ) : (
            <Menu.Item
              name="Sign In"
              active={activeItem === "Sign In"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
              position="right"
            >
              {" "}
              <Button primary>Sign in</Button>
            </Menu.Item>
          )}
        </Menu>
        <SideBarMenu
          visible={visible}
          handleSidebarHide={handleSidebarHide}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          logout={logout}
        />
      </React.Fragment>
    );
  }
}

export default NavBar;
