// Libraries
import React, { Component, PropTypes } from 'react';

class Confirm extends Component{
    render(){
        return(
            <div className="remove-container">
                <div className="confirmRemove">
                    <h3>
                        Remove person
                    </h3>
                    <p>
                        Are you sure you want to remove this entry?
                    </p>
                    <div className="confirm-btn">             
                        <button
                            role="abort"
                            type="button"
                            onClick={() => this.props.abort()}
                        >
                        CANCEL
                        </button>
                        <button
                            role="confirm"
                            type="button"
                            ref="confirm"
                            onClick={() => this.props.confirm()}
                        >
                        YES
                        </button>
                    </div>                           
                </div>
            </div> 
        );
    }
}
Confirm.propTypes={
    abort: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired
}
export default Confirm;