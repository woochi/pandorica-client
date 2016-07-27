import styles from './TextField.scss';
import classnames from 'classnames';

const TextField = (props) => {
  const className = classnames(styles.input, props.className);
  return (
    <div className={styles.normal}>
      {props.label &&
        <label>{props.label}</label>
      }
      <input {...props} className={className}/>
      <div className={styles.underline}></div>
    </div>
  );
};

export default TextField;
