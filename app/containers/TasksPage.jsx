import React from 'react';
import {Page, PageSlider} from 'components/Page';
import TextField from 'material-ui/TextField';
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
import GreenButton from 'components/GreenButton';
import TaskCodeForm from 'components/TaskCodeForm';
import { bindActionCreators } from 'redux';
import * as errorActions from 'actions/errorActions';

const fields = ['code'];

class TasksPage extends React.Component {
  render() {
    const {
      task,
      fields: {code}
    } = this.props;
    let content;
    return (
      <Page>
        <Center>
          <Title>Found a wild quest marker?</Title>
          <Paragraph>Get codes from presentations, hidden quest markers or surprise events.<br/>Enter the code and collect points for your team!</Paragraph>
          <TaskCodeForm {...code} onSubmit={this.checkCode}/>
        </Center>
      </Page>
    );
  }

  checkCode = () => {
    this.props.taskActions.submit(this.props.fields.code.value).then((task) => {
      this.props.router.push({
        pathname: `/app/tasks/${task._id}/success`,
        state: {nextPathName: '/app/tasks'}
      });
    }).catch((error) => {
      this.props.errorActions.error(error);
    });
  }
}

function mapStateToProps(state, props) {
  return {
    task: state.get('task')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'task',
  fields,
  getFormState
})(withRouter(TasksPage)));
