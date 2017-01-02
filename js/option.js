// Libraries
import React, { Component, PropTypes } from 'react';

class Option extends Component{ 
    render(){
        return(
            <option value={this.props.option}>
                    {this.props.option}
            </option>
        )
    }

}
Option.PropTypes={
    option: PropTypes.oneOfType(
        [
            PropTypes.number,
            PropTypes.string
        ]   
    ),
}

export default Option;