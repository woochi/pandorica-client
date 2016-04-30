import React from 'react';
import {Page, PageSlider} from 'components/page';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SwipeableViews from 'react-swipeable-views';
import Paragraph from 'components/paragraph';
import PointDisplay from 'components/PointDisplay';
import Center from 'components/Center';
import { connect } from 'react-redux';
import * as taskActions from 'actions/taskActions';
import Title from 'components/Title';
import Fieldset from 'components/Fieldset';
import FooterLink from 'components/FooterLink';
import {getFormState} from 'lib/immutableForm';
import {reduxForm} from 'redux-form';

const fields = ['code'];

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  render() {
    const {
      fields: {code}
    } = this.props;
    let content;
    const task = this.props.task;
    const currentSlideIndex = task.get('completed') ? 1 : 0;
    return (
      <PageSlider index={currentSlideIndex}>
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
        <Page>
          <Center>
            <PointDisplay points={task.get('points')}/>
            <Paragraph>You have successfully completed the task!</Paragraph>
            <RaisedButton label="Continue to next task" primary={true} onClick={this.continue}/>
          </Center>
        </Page>
      </PageSlider>
    );
  }

  checkCode = (nextIndex) => {
    this.props.dispatch(taskActions.submit());
  }

  continue = () => {
    this.props.resetForm();
    this.props.dispatch(taskActions.ok());
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
})(TasksPage));
