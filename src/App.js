import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import config from "./config";

firebase.initializeApp(config);

class ProfilePage extends Component {
  state = {
    username: "jbromley94",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    geopoint: [-2.233102, 53.477375]
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref(this.state.username)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        this.setState({ avatarURL: url });
    
    })

      
  };

  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
          <FileUploader
            accept="image/*"
            name="avatar"
            filename={file =>
              "~" +
              this.state.geopoint +
              "~" +
              this.state.username +
              file.name.split(".")[1]
            }
            storageRef={firebase.storage().ref(this.state.username)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          
          <CustomUploadButton
            accept="image/*"
            storageRef={firebase.storage().ref(this.state.username)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            style={{
              backgroundColor: "steelblue",
              color: "white",
              padding: 10,
              borderRadius: 4
            }}
          >
            Select your awesome avatar
          </CustomUploadButton>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
