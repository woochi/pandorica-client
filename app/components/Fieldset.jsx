import styles from './Fieldset.scss';
import Field from 'components/Field';

class Fieldset extends React.Component {
  render() {
    return (
      <div className={styles.FieldSet}>
        {React.Children.map(this.props.children, (child) => {
          return (<Field>{child}</Field>);
        })}
      </div>
    );
  }
}

export default Fieldset;
