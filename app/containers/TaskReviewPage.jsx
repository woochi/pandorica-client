import React from 'react';

class TaskReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'TaskReviewPage';
  }

  render() {
    return (
      <Page>
        <Center>
          <PointDisplay/>
          <Paragraph>You have successfully completed the task!</Paragraph>
          <RaisedButton label="Continue to next tasks" primary={true} onClick={this.checkCode.bind(this, 0)}/>
        </Center>
      </Page>
    );
  }
}

export default TaskReviewPage;
