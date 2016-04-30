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
import FetchError from 'components/FetchError';
import CircularProgress from 'material-ui/lib/circular-progress';
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

  componentWillMount() {
    this.props.dispatch(taskActions.fetch());
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
    const currentSlideIndex = this.props.task.getIn(['data', 'completed']) ? 1 : 0;
    return (
      <PageSlider index={currentSlideIndex}>
        <Page>
          {content}
        </Page>
        <Page>
          <Center>
            <PointDisplay/>
            <Paragraph>You have successfully completed the task!</Paragraph>
            <RaisedButton label="Continue to next task" primary={true} onClick={this.continue}/>
          </Center>
        </Page>
      </PageSlider>
    );
  }

  checkCode = (nextIndex) => {
    this.props.dispatch(taskActions.complete());
  }

  continue = () => {
    this.props.resetForm();
    this.props.dispatch(taskActions.fetch());
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
