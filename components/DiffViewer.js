import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

export class DiffViewer extends React.Component {
  
  state = {
    highlightedLine: null,
  };

  renderContent = (content) => {
    return (
      <pre style={{ display: 'inline' }} dangerouslySetInnerHTML={{ __html: content }} />
    );
  };

  handleLineClick = (lineId, event) => {
    this.setState({ highlightedLine: lineId });
  };

  getStyles = (styles) => {
    const { highlightedLine } = this.state;

    if (highlightedLine === null) {
      return styles;
    }

    return {
      ...styles,
      gutter: {
        ...styles.gutter,
        [highlightedLine]: { backgroundColor: 'yellow' },
      },
    };
  };

  render() {
    const { oldValue, newValue } = this.props;
    return (
      <ReactDiffViewer 
        oldValue={oldValue} 
        newValue={newValue} 
        splitView={true} 
        compareMethod={DiffMethod.WORDS_WITH_SPACE} 
        leftTitle={"Old"} 
        rightTitle={"New"} 
        renderContent={this.renderContent} 
        onLineClick={this.handleLineClick}
        styles={this.getStyles}
        hideLineNumbers={true}
        showDiffOnly={true}
      />
    );
  }
}
