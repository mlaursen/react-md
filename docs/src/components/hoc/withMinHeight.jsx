import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';

export default function withMinHeight(Component) {
  return class ComponentWithMinHeight extends PureComponent {
    static propTypes = {
      style: PropTypes.object,
    };

    constructor(props) {
      super();

      this.state = { style: props.style };
    }

    componentDidMount() {
      this.updateMinHeight(this.props);

      window.addEventListener('resize', this.handleResize);
      if (__DEV__) {
        window.addEventListener('load', () => this.updateMinHeight(this.props));
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.style !== nextProps.style) {
        this.updateMinHeight();
      }
    }

    componentWillUnmount() {
      if (this.frame) {
        window.cancelAnimationFrame(this.frame);
      }

      window.removeEventListener('resize', this.handleResize);
      if (__DEV__) {
        window.removeEventListener('load', () => this.updateMinHeight(this.props));
      }
    }

    handleResize = () => {
      if (!this.ticking) {
        this.frame = window.requestAnimationFrame(() => {
          this.frame = null;
          this.ticking = false;
          this.updateMinHeight(this.props);
        });
      }

      this.ticking = true;
    };

    updateMinHeight = (props) => {
      const toolbar = document.getElementById('main-toolbar');
      const footer = document.getElementById('main-footer');
      if (!toolbar || !footer) { // tests
        return;
      }

      const minHeight = window.innerHeight - toolbar.offsetHeight - footer.offsetHeight;

      const style = { ...props.style, minHeight };
      if (!shallowEqual(this.state.style, style)) {
        this.setState({ style });
      }
    };

    render() {
      return <Component style={this.state.style} {...this.props} />;
    }
  };
}
