import React from 'react'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();
    
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
    
        fetch('https://panel.brainvoip.us:8080/upload', { method: 'POST', body: data })
        .then((response) => { response.json().then((body) => { 
            console.log(body)
            this.setState({ status: body.status });
          });
        });
      }

    render() {
        return (
          <form onSubmit={this.handleUploadImage}>
            <div>
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>
            <br />
            <div>
              <button>Upload</button>
            </div>
            <p>Result: {this.state.status ? this.state.status : 'No result'}</p>
          </form>
        );
      }
}

export default Main;
