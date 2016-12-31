// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery';

const Confirm = React.createClass({
    displayName: "Confirm",
    getDefaultProps(){
        return{
            confirmLabel:'OK',
            abortLabel:'Cancel'
        };
    },
    abort(){
        return this.promise.reject();
    },
    confirm(){
        return this.promise.resolve();
    },
    componentDidMount(){
        this.promise = new $.Deferred();
        return ReactDOM.findDOMNode(this.refs.confirm).focus();
    },
    render(){
        var modalBody;
        if(this.props.description){
            modalBody = (
                <p>
                    {this.props.description}
                </p>
            );
        }
        return(
            <Modal>
                <div className="remove-container">
                    <div className="confirmRemove">
                        <h3>
                            {this.props.message}
                        </h3>
                        {modalBody}               
                        <button
                            role="abort"
                            type="button"
                            onClick={this.abort}
                        >
                        {this.props.abortLabel}
                        </button>
                        <button
                            role="confirm"
                            type="button"
                            ref="confirm"
                            onClick={this.confirm}
                        >
                        {this.props.confirmLabel}
                        </button>                           
                    </div>
                </div>           

            </Modal>
        );
    }
});

const Modal = React.createClass({
  displayName: 'Modal',

  modal: function() {
    var style = {display: 'block'};
    return (
        <div
        className='modal in'
        tabIndex='-1'
        role='dialog'
        aria-hidden='false'
        ref='modal'
        style={style}
        >
            {this.props.children}
        </div>
    );
  },

  render: function() {
    return (
      <div>
        {this.modal()}
      </div>
    );
  }
});

const confirm = (message,options)=>{
    var cleanup, component, props, wrapper;
    if (options == null) {
        options = {};
    }
    props = $.extend({
        message: message
    }, options);
    wrapper = document.body.appendChild(document.createElement('div'));
    component = ReactDOM.render(<Confirm {...props}/>, wrapper);
    cleanup = function() {
        ReactDOM.unmountComponentAtNode(wrapper);
        return setTimeout(function() {
        return wrapper.remove();
        });
    };
    return component.promise.always(cleanup).promise();
}

// $(function() {
//   return $('.deleteUser').click(function() {
//     return confirm('Remove person', {
//       description: 'Are you sure you want to remove this entry?',
//       confirmLabel: 'YES',
//       abortLabel: 'CANCEL'
//     }).then((function(_this) {
//       return function() {
//         return $(_this).parent().parent().remove();
//       };
//     })(this));
//   });
// });