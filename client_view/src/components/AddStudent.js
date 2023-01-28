import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Toaster from './Toaster';

function FgLoading(props) {
  return (
    <div className="modal fade" id="submitLoading" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog" style={{position: 'fixed', top: '48%', left: '48%', transform: 'transform(-50%, -50%)'}}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
              <button className="btn hide" data-bs-dismiss="modal" ref={props.reference}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddStudent(props) {     
  const [displayMessage, setDisplayMessage] = useState({
    error: false,
    success: false
  });

  const loadRefer = useRef(null);

  const onSubmitClick = function(e) {
      var data = {};
      for (let i = 0; i < e.target.length; i++) {
        if (e.target[i].name)
          data[e.target[i].name] = e.target[i].value;
      }
      const host = window.location.hostname;
      axios.post("http://" + host + ":4000/studentprofiles", data)
        .then(res => {
          const dismissbtn = loadRefer.current;
          if (dismissbtn) {
            console.log("dismissing");
            dismissbtn.click();
          }
          if (res.data.error)
            setDisplayMessage({error: true});
          else
            setDisplayMessage({success: true});
        })
        .catch(() => {
          const dismissbtn = loadRefer.current;
          if (dismissbtn) {
            console.log("dismissing");
            dismissbtn.click();
          }
          setDisplayMessage({error: true});
        });
  }

  return (
    <div className="box">
      <div className="box-container">
        <div className="row header">
          <Header title={props.title} path="/addstudent"/>
        </div>
        <div className="row content bg-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add New Student Profile</h3>
                  </div>
                  <div className="card-body">
                    <form noValidate onSubmit={onSubmitClick}>
                      <div className="row form-group p-2">
                        <label htmlFor="firstname" className="col-sm-2 col-form-label">Input First Name: </label>
                        <div className="col-sm-10">
                          <input type="text" name="firstname" className="form-control" />
                        </div>
                      </div>
                      <div className="row form-group p-2">
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Input Last Name: </label>
                        <div className="col-sm-10">
                          <input type="text" name="lastname" className="form-control" />
                        </div>
                      </div>
                      <div className="row form-group p-2">
                        <label htmlFor="course" className="col-sm-2 col-form-label">Input Course: </label>
                        <div className="col-sm-8">
                          <input type="text" name="course" className="form-control" />
                        </div>
                        <label htmlFor="year" className="col-sm-1 col-form-label">Year: </label>
                        <div className="col-sm-1">
                          <select name="year" className="form-control text-center" style={{fontFamily: 'Droid Sans'}}>
                              <option value="1">I</option>
                              <option value="2">II</option>
                              <option value="3">III</option>
                              <option value="4">IV</option>
                          </select>
                        </div>
                      </div>
                      <div className="row form-group pt-4 pb-3 text-center" style={{width: "10em", display: "block", marginLeft: "auto", marginRight: "auto"}}>
                        <button type="submit" className="btn border-solid bg-primary font-weight-bold text-light mw-50" data-bs-toggle="modal" data-bs-target="#submitLoading">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer bg-light">
            <Footer />
        </div>
      </div>
      <div className="position-fixed">
        {displayMessage.success ? <Toaster title="Add Student Profile" message="Successfully Registered!" /> : null}
        {displayMessage.error ? <Toaster title="Add Student Profile" message="Failed to Register Student!" /> : null}
      </div>
      {/*  <!-- Modal --> */}
      <FgLoading ref={loadRefer}/>
    </div> 
  );
}

export default AddStudent;