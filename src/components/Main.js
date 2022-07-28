import React from 'react'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            btcAddress: ""
        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();
        if(this.state.btcAddress == ""){
            alert("Input the valid wallet address that can receive!")
            return false;
        }
        this.setState({ status: "Processing" });

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);

        fetch('https://panel.brainvoip.us:8443/upload', { method: 'POST', body: data })
            .then((response) => {
                response.json().then((body) => {
                    console.log(body)
                    this.setState({ status: body.status });
                });
            });
    }

    handleChange(e) {
        this.setState({btcAddress: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <br />
                <div>
                    <input placeholder='Your BTC Address' value={this.state.btcAddress} onChange={(e) => this.handleChange(e)}/>
                </div>
                <br />
                <div>
                    <button>Start Transaction</button>
                </div>
                <p>Result: {this.state.status ? this.state.status : 'No result'}</p>
            </form>
        );
    }
}

export default Main;
