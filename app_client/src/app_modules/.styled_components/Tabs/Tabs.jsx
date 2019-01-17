import React from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";

export const TabBarContainer = styled.nav`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

export const TabsInkBar = styled.div`
  bottom: 0;
  height: 2px;
  position: absolute;
  transition-duration: 200ms;
  transition-property: left, width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${props => props.inkbarColor || props.theme.primary};
  left: ${props => props.left}px;
  width: ${props => props.width}px;
`;

class TabBarComponent extends React.PureComponent {
  static defaultProps = {
    fixed: false,
    showInkbar: true,
    selectedIndex: 0
  };

  state = {
    inkbarPosition: {}
  };

  componentDidMount() {
    this.mounted = true;

    window.addEventListener("resize", this.resizeInkbar);
    this.resizeInkbar();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps === this.props) return;

    if (nextProps.selectedIndex !== this.props.selectedIndex) {
      this.resizeInkbar();
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener("resize", this.resizeInkbar);
  }

  nav = null;
  mounted = false;

  resizeInkbar = debounce(() => {
    const { left: navLeft } = this.nav.getBoundingClientRect();
    const { left, width } = this.nav.children[
      this.props.selectedIndex
    ].getBoundingClientRect();

    this.setState({
      inkbarPosition: {
        left: left - navLeft,
        width
      }
    });
  });

  render() {
    const { children, showInkbar, inkbarColor, onClick } = this.props;

    const tabs = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        selected: this.props.selectedIndex === index,
        onClick
      })
    );

    return (
      <TabBarContainer
        innerRef={node => {
          this.nav = node;
        }}
      >
        {tabs}

        {showInkbar && this.mounted && (
            <TabsInkBar
              inkbarColor={inkbarColor}
              {...this.state.inkbarPosition}
            />
          )}
      </TabBarContainer>
    );
  }
}

const TabsComponent = ({ className, children }) => (
  <section className={className}>{children}</section>
);

export const TabBar = styled(TabBarComponent)``;

export const Tabs = styled(TabsComponent)`
  /* box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;

  & .tab {
    flex: ${props => (props.fixed ? 1 : "none")};
  } */
`;
