import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class EditPlace extends Component {
  state = {
    title: '',
    description: '',
    photo: '',
    userPhoto: '',
    uploadOn: true,
    uploadOn2: true
  }

  // constructor(props) {
  //   super(props);
  //   this.state = { pictures: [] };
  //   this.onDrop = this.onDrop.bind(this);
  // }

  onDrop=(picture)=> {
    this.setState({
      photo: this.state.photo.concat(picture),
    });
  }
  addPlace = () => {
    const newPlace = { 'title': 'Camping in Berlin', 'description': 'The best camping in Berlin' };
    this.setState((state, props) => {
      places: state.places.concat(newPlace)
    })
  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // console.log(name, value, this.state)
    this.setState({
      [name]: value 
    }) 
  }

  handleFileUpload = event => {
    const uploadData = new FormData();
    uploadData.append("imagePath", event.target.files[0]);
    
    this.setState({uploadOn2: true});

    axios
    .post("/api/places/uploadImage", uploadData)
    .then(response => {
      console.log(response)
      this.setState({
        photo: response.data,
        uploadOn2: false
      })
    })
    .catch(err => console.log("Error while uploading the file", err)) 
  } 

  // this should be for the profile picture
  handleFileUploadProfile = event => {
    const uploadData = new FormData();
    uploadData.append("imagePath", event.target.files[0]);
    
    this.setState({uploadOn: true});

    axios
    .post("/api/auth/uploadImage", uploadData)
    .then(response => {
      console.log(response)
      this.setState({userPhoto: response.data,
        uploadOn: false})
    })
    .catch(err => console.log("Error while uploading the file", err)) 
  } 
 
  // what is missing?

  handleSubmit = event => {
    event.preventDefault();
    console.log("banana")
    const { title, description,photo } = this.state;
    const newPlace = {
      title,
      description,
      photo
    }
    // console.log(newPlace)
    axios
    .post("/api/places/new", newPlace)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      return err.response.data;
    });
    // this.setState((state, props) => ({
    //   places: [newPlace, ...state.places],
    //   title: '',
    //   description: '',
    // }))
  }

  handleSubmitUserProfile = event => {
    event.preventDefault();
    console.log(this.state.userPhoto)
    axios
    .post("/api/auth/profilePicture", {photo: this.state.userPhoto})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      return err.response.data;
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className='Form'>
        <form encType="multipart/form-data"  onSubmit={this.handleSubmitUserProfile}>
        <h2>Add a your profile picture!</h2> 
        <input type="file" name="photo" onChange={this.handleFileUploadProfile}></input>
        <br></br>
        <br></br>
        {this.state.uploadOn ? <button disabled type='submit'> Add a your profile picture </button> : <button type='submit'> Add a your profile picture </button>}
        </form>

        <h2> Add a new place for Camping!</h2>
        <form encType="multipart/form-data"  onSubmit={this.handleSubmit}>

          <label htmlFor='title'> Title: </label>
          <input
            type='text'
            name='title'
            id='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          

          <label htmlFor='description'> Description: </label>
          <input
            type='text'
            name='description'
            id='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
          
          <input type="file" name="photo" onChange={this.handleFileUpload}></input>
       {/*    <ImageUploader
          withIcon={true}
          name="photo"
          buttonText='Choose images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        /> */}

          <br></br>
          <br></br>
          {this.state.uploadOn2 ? <button disabled type='submit'> Add a Place </button> : <button type='submit'> Add a Place </button>}

        </form>

        

        <h1> All my created places </h1>
        List with all the places I created.
      </div>
    )
  }
}

export default EditPlace;
