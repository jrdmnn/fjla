import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

class PlacesList extends Component {
  // state= {
  //   places: [],
  // }
  
  // getData() {
  //   axios.get("/api/places/userPlaces").then(response => {
  //     this.setState({
  //       places: response.data
  //     })
  //   }).catch(err => console.log(err))
  // }

  // componentDidMount() {
  //   this.getData()
  // }

  handleDelete = id => {
    console.log("delete", id)
    axios
    .post(`/api/places/delete/${id}`) 
    .then((response) => {
      console.log(response.data);
      this.props.getData();
    })
    .catch((err) => {
      return err.response.data;
    });
  }

  handleLike = id => {
    console.log("like", id)
    axios
    .put(`/api/places/like/${id}`)  
    .then((response) => {
      console.log(response.data);
      this.props.getData();
    })
    .catch((err) => {
      return err.response.data;
    });
  }

  
    

  componentDidUpdate(prevProps, _) {
    if (prevProps.places !== this.props.places) {
      this.render()
    }
  }


  render() {
    console.log(this.props.places, "PLACES")
    return (
      <div>
      {this.props.places.map(place => {
        return (
          <div key={place._id}>
          <img className="myPlaces" src={place.imgPath} />
          <Link to={`/place/${place._id}`}><p>{place.name}</p></Link>
          <p> Place created by {place.userId.username}</p>
          {/* <img className="profileimg" src={place.imgPath} /> */}
          <p> {place.description} </p>
        <p>{}</p>
          <p>Likes: {place.likes} </p> 
          <button type="like" onClick= {() => this.handleLike(place._id)}> Like </button>
          <br></br>
          <button type="delete" onClick= {() => this.handleDelete(place._id)}> Delete Place </button>
          </div>
        )
      })}
      </div>
    )
  }
}

export default PlacesList;