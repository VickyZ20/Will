import React from "react";
import { useState, useEffect } from "react";
import { Container, Form, Col, option } from "react-bootstrap";
import Navbar from "../components/navBar/Navbar";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import * as loginToken from "../components/loginTokenAndSignOff";

function CreatePost() {
  const history = useHistory();

  useEffect(() => {
    const data = localStorage.getItem("current-user");
    if (data) {
      setUserInfo(data);
      setFormValue({
        ...formValue,
        email: data,
      });
    }
  }, []);

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });
      console.log(result);
      if (result.result === false) {
        history.push("/v_signin");
      }
    }
  };

  const [userInfo, setUserInfo] = useState();

  const [formValue, setFormValue] = useState({
    email: "",
    street: "",
    city: "",
    state: "",
    size: "",
    price: "",
    pet: false,
    furniture: false,
    gender: false,

    userId: "123",
  });

  const [imagefile, setImgFile] = useState("");

  const handleChanges = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const Abbreviations = [
    "San Francisco",
    "Upper market",
    "Misson District",
    "Noe Valley",
    "Twin Peaks",
  ];

  const ConditionsPet = ["Pet Friendly", "Some pets allowed", "No pet"];

  const furniture = ["Furnitured", "No Furniture"];

  const ConditionsG = ["Female only", "No restrictions"];

  const handleChangeCheckBox = (event) => {
    setFormValue({
      ...formValue,
      [event.target.id]: event.target.checked,
    });

    console.log(formValue.monday);
  };

  const handleFile = (event) => {
    console.log(event);
    setImgFile(event.target.files[0]);
  };

  const createPost = () => {
    console.log(imagefile);
    console.log(formValue);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValue),
    };
    fetch("/insert_newpost", requestOptions)
      .then(async (response) => {
        swal("SUCCESS", "You post is successfully published  ", "success");
        const data = await response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    history.push("/home");
  };

  /*useEffect(()=>{
  fetch("/get_data", {method:"get"} )
  .then(async(response)=>{
    console.log(JSON.parse(response));

  })
  .catch((error)=>{console.log(error)})},[]
  
)*/

  return (
    <div>
      <Container>
        <br />
        <div>
          <h4>Add an Offer !</h4>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=" "
                  name="city"
                  value={formValue.city}
                  onChange={handleChanges}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Neighborhood</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="state"
                  value={formValue.state}
                  onChange={handleChanges}
                >
                  {Abbreviations.map((st) => (
                    <option>{st}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Pet</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="pet"
                  value={formValue.pet}
                  onChange={handleChanges}
                >
                  {ConditionsPet.map((st) => (
                    <option>{st}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Furniture</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="furniture"
                  value={formValue.furniture}
                  onChange={handleChanges}
                >
                  {furniture.map((st) => (
                    <option>{st}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Room Size</Form.Label>
                <Form.Control
                  type="number"
                  name="size"
                  value={formValue.size}
                  onChange={handleChanges}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="col-sm-4 " controlId="formGridAddress1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="$"
                  name="price"
                  value={formValue.price}
                  onChange={handleChanges}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="Choose..."
                  name="gender"
                  value={formValue.gender}
                  onChange={handleChanges}
                >
                  {ConditionsG.map((st) => (
                    <option>{st}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder=" "
                  name="street"
                  value={formValue.street}
                  onChange={handleChanges}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </div>
        <br />

        <br />
        <div>
          <button
            type="button"
            className="btn btn-dark  btn-block"
            onClick={createPost}
          >
            Add an offer
          </button>
        </div>
      </Container>
    </div>
  );
}

export default CreatePost;
