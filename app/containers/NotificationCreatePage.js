import React from 'react';
import {Page, PaddedContainer} from 'components/Page';
import {TextField, SelectField} from 'material-ui';
import Fieldset from 'components/Fieldset';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import {fetch} from 'actions/taskActions';
import {connect} from 'react-redux';
import {MenuItem} from 'material-ui/Menu';
import {reduxForm} from 'redux-form';
import {getFormState} from 'lib/immutableForm';
import PrimaryButton from 'components/PrimaryButton';
import api from 'lib/api';

class NotificationCreatePage extends React.Component {
  constructor() {
    super();
    this.state = {task: null};
  }

  componentDidMount() {
    this.props.dispatch(fetch());
  }

  render() {
    const {tasks, fields} = this.props;
    const taskMenuItems = tasks.map((task, id) => {
      return <MenuItem key={id} value={id} label={task.get('name')} primaryText={task.get('name')}/>
    }).toArray();
    return (
      <Page>
        <PaddedContainer>
          <Fieldset>
            <Title>Send out a new notification</Title>
            <Subtitle>Notifications can be either simple messages or linked to a task. Notifications are always globally public.</Subtitle>
            <TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Title" hintText="E.g. Join the lecture at Klondyke" onChange={fields.title.onChange} value={fields.title.value}/>
            <TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Message" multiLine={true} onChange={fields.message.onChange} value={fields.message.value}/>
            <SelectField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Linked task" hintText="None selected" onChange={this.onChangeTask} value={this.state.task}>
              {taskMenuItems}
            </SelectField>
            <PrimaryButton onClick={this.props.handleSubmit(this.onSubmit)}>Send</PrimaryButton>
          </Fieldset>
        </PaddedContainer>
      </Page>
    );
  }

  onChangeTask = (event, index, taskId) => {
    this.setState({task: taskId});
  }

  onSubmit = () => {
    const {title, message} = this.props.fields;
    api.post('/notifications', {
      title: title.value,
      message: message.value,
      task: this.state.task
    });
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.getIn(['entities', 'tasks'])
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'notification',
  fields: ['title', 'message', 'task'],
  getFormState
})(NotificationCreatePage));
