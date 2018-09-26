import React from 'react';

class Sig extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { email: props.state.user.primaryEmail };
  }

  handleSubmit() {
    const {
      history
    } = this.props;
    this.setState({ "doingSignature": true });
    console.log(this.state);
    Meteor.call("setSignature", this.state.email, this.state.title, this.state.role, this.state.phone, this.state.email.split("@")[1], (err, res) => {
      console.log(err, res);
      this.setState({ "doingSignature": false });
    });
  }

  render() {
    //const age = Moment(doc.startTime).fromNow();
    console.log(this.state);
    return (
        <div>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <div>
            Roles
            </div>
            <div>
            <input
              id="role"
              label="Role"
              value={this.state.role}
              onChange={event => this.setState({ role: event.target.value })}
            />
            </div>
            <div>
            Title
            </div>
            <div>
            <input
              id="title"
              label="Title"
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })}
            />
            </div>
            <div>
            Phone
            </div>
            <div>
            <input
              id="phone"
              label="Phone"
              value={this.state.phone}
              onChange={event => this.setState({ phone: event.target.value })}
            />
            <div>
            <button onClick={(e) => this.handleSubmit(e)}>Set Signature</button>
            </div>
            </div>
          </form>
          <div>Email: {this.state.email}</div>
          {this.state.doingSignature ? <div>Setting Signature</div> : false}
        </div>);
  };
}

module.exports =  (config)=>{
  const {field, state, props} = config;
  console.log(config);

  return (<Sig field={field} state={state} props={props}/>);
}
