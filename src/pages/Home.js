import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Button, Form, OverlayTrigger, Table, Tooltip } from "react-bootstrap";

import EditIcon from "@mui/icons-material/Edit";

import JsonData from "../jsonFiles/sample-data.json";

export default function Home() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("add");
  const [editRecord, setEditRecord] = useState([]);
  const genderList = ["", "Male", "Female", "Unknown"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [score, setScore] = useState("");

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setData(JsonData);
    };
    fetch();
    
  }, []);

  function handleAdd(e) {
    var id = data.length + 1;
    console.log(id);
    var addData = {
      id: id,
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      score: score,
    };
    const newData = [...data, addData];
    setData(newData);
  }

  function handleEdit() {
    var index = editRecord.id - 1;
    var tempData = data;

    tempData[index].firstname = firstName;
    tempData[index].lastName = lastName;
    tempData[index].gender = gender;
    tempData[index].score = score;

    setData([...tempData]);
  }

  function handleType(item) {
    setType("edit");
    console.log();
    setFirstName(item.firstname);
    setLastName(item.lastname);
    setGender(item.gender);
    setScore(item.score);
    setEditRecord(item);
    setForm({
      firstname: item.firstname,
      lastname: item.lastname,
      gender: item.gender,
      score: item.score,
    });
    setErrors({})
  }

  function handleCancel() {
    setType("add");
    setFirstName("");
    setLastName("");
    setGender("");
    setScore("");
    setForm({});
  }

  const findFormErrors = () => {
    const { firstname, lastname, gender, score } = form;
    const newErrors = {};

    if (!firstname || firstname === "")
      newErrors.firstname = "First name is required.";
    else if (!lastname || lastname === "")
      newErrors.lastname = "Last name is required.";

    if (!gender || gender === "") newErrors.gender = "Gender is required.";

    if (!score || score === "") newErrors.score = "Score is required.";
    if (isNaN(score)) newErrors.score = "Number only";

    if (score < 0) newErrors.score = "Minimum is 0";

    if (score > 100) newErrors.score = "Maximum is 100";

    return newErrors;
  };

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(errors);

      if (type === "add" && !!errors) {
        
        var id = data.length + 1;
        console.log(id);
        var addData = {
          id: id,
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          score: score,
        };
        const newData = [...data, addData];
        setData(newData);
      }

      if (type === "edit" && !!errors) {
        var index = editRecord.id - 1;
        var tempData = data;

        tempData[index].firstname = firstName;
        tempData[index].lastName = lastName;
        tempData[index].gender = gender;
        tempData[index].score = score;

        setData([...tempData]);
      }
    }
  }

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (field === "firstname") setFirstName(value);
    if (field === "lastname") setLastName(value);
    if (field === "gender") setGender(value);
    if (field === "score") setScore(value);

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const tooltipM = <Tooltip id="tooltip">Male</Tooltip>;
  const tooltipF = <Tooltip id="tooltip">Female</Tooltip>;
  const tooltipU = <Tooltip id="tooltip">Unknown</Tooltip>;

  const tooltipBlank = "";

  return (
    <>
      <div>Home</div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="flex">
              <div>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  //   onChange={(e) => setFirstName(e.target.value)}
                  onChange={(e) => setField("firstname", e.target.value)}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstname}
                </Form.Control.Feedback>
              </div>
              <div>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  //   onChange={(e) => setLastName(e.target.value)}
                  onChange={(e) => setField("lastname", e.target.value)}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastname}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="flex">
              <div>
                <Form.Label>Gender</Form.Label>

                <Form.Select
                  aria-label=""
                  style={{ width: "210px" }}
                  value={gender}
                  //   onChange={(e) => setGender(e.target.value)}
                  onChange={(e) => setField("gender", e.target.value)}
                  isInvalid={!!errors.gender}
                >
                  <option value=""></option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="U">Unknown</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </div>
              <div>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  value={score}
                  //   onChange={(e) => setScore(e.target.value)}
                  onChange={(e) => setField("score", e.target.value)}
                  isInvalid={!!errors.score}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.score}
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="flex-btn">
              {type === "add" ? (
                <Button
                  variant="primary"
                  // onClick={handleAdd}
                  type="submit"
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="primary"
                  // onClick={handleEdit}
                  type="submit"
                >
                  Edit
                </Button>
              )}

              <Button variant="light" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th></th>
              <th>First name</th>
              <th>Last name</th>
              <th>Gender</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <div onClick={() => handleType(item)}>
                      <EditIcon />
                    </div>
                  </td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>
                    <OverlayTrigger
                      key={item.id}
                      placement="right"
                      overlay={
                        item.gender === "M"
                          ? tooltipM
                          : item.gender === "F"
                          ? tooltipF
                          : item.gender === "U"
                          ? tooltipU
                          : tooltipBlank
                      }
                    >
                      <div>{item.gender}</div>
                    </OverlayTrigger>
                  </td>
                  <td>{Number(item.score).toFixed(2)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
