import React from 'react';
import Title from 'components/Title';
import Fieldset from 'components/Fieldset';
import FooterLink from 'components/FooterLink';
import {getFormState} from 'lib/immutableForm';
import {reduxForm} from 'redux-form';
import FetchError from 'components/FetchError';
import CircularProgress from 'material-ui/CircularProgress';

class CurrentTaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CurrentTaskPage';
    this.state = {
      slideIndex: 0
    };
  }

  render() {
    const {
      fields: {code}
    } = this.props;
    let content;
    const task = this.props.task.get('data').toJS();
    if (this.props.task.get('error')) {
      content = <FetchError/>;
    } else if (this.props.task.get('loading')) {
      content = <Center><CircularProgress></CircularProgress></Center>;
    } else {
      content = <Center>
        <Title>{task.name}</Title>
        <Paragraph>{task.description}</Paragraph>
        <Fieldset>
          <TextField hintText="Insert task code" type="text" pattern="\d*" {...code}></TextField>
          <RaisedButton label="Check code" primary={true} fullWidth={true} onClick={this.checkCode}/>
        </Fieldset>
      </Center>;
    }
    return <Page>{content}</Page>;
  }

  checkCode = (nextIndex) => {
    this.props.dispatch(taskActions.complete());
  }
}

function mapStateToProps(state, props) {
  return {
    task: state.get('task')
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'task',
  fields,
  getFormState
})(CurrentTaskPage));
