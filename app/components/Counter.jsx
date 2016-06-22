import raf from 'raf';
import ease from 'ease-component';

class Counter extends React.Component {
  static defaultProps = {
    delay: 0,
    from: 0,
    duration: 1000
  }

  static propTypes = {
    to: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.displayName = 'Counter';
    this.state = {
      value: props.from
    }
  }

  componentDidMount() {
    this.start = Date.now() + this.props.delay;
    this.timeout = setTimeout(() => {
      this.animator = raf(this.animate);
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    raf.cancel(this.animator);
  }

  animate = () => {
    this.animator = raf(this.animate);
    this.draw();
  }

  draw = () => {
    const duration = this.props.duration;
    const from = this.props.from;
    const to = this.props.to;
    const easing = this.props.easing && this.props.easing in ease ? easing : 'outCube';

    const now = Date.now();
    if (now - this.start >= duration) raf.cancel(this.animator);
    const percentage = Math.min((now - this.start) / duration, 1);
    const easeVal = ease[easing](percentage);
    const value = from + (to - from) * easeVal;
    this.setState({value});
  }

  render() {
    return <div {...this.props}>+{Math.round(this.state.value)}</div>;
  }
}

export default Counter;
