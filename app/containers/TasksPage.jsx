import React from 'react';
import {Page, PageSlider} from 'components/Page';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import Paragraph from 'components/Paragraph';
import PointDisplay from 'components/PointDisplay';
import Center from 'components/Center';
import { connect } from 'react-redux';
import * as taskActions from 'actions/taskActions';
import Title from 'components/Title';
import Fieldset from 'components/Fieldset';
import FooterLink from 'components/FooterLink';
import {getFormState} from 'lib/immutableForm';
import {reduxForm} from 'redux-form';
import {withRouter} from 'react-router';

const fields = ['code'];

class TasksPage extends React.Component {
  render() {
    const {
      fields: {code}
    } = this.props;
    let content;
    const task = this.props.task;
    return (
      <Page>
        <Center>
          <Title>{task.name}</Title>
          <Paragraph>{task.description}</Paragraph>
          <Fieldset>
            <TextField hintText="Insert task code" type="text" {...code}></TextField>
            <RaisedButton label="Check code" primary={true} fullWidth={true} onClick={this.checkCode} disabled={task.get('loading')}/>
          </Fieldset>
        </Center>
      </Page>
    );
  }

  checkCode = () => {
    this.props.dispatch(taskActions.submit(this.props.fields.code.value)).then((task) => {
      this.props.router.push({
        pathname: `/app/tasks/${task._id}/success`,
        state: {nextPathName: '/app/tasks'}
      });
    });
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
})(withRouter(TasksPage)));
