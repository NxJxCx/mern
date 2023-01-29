import Header from './Header';
import Footer from './Footer';
import Error404 from './Error404';
import Toaster from './Toaster';
import FgLoading from './FgLoading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from'react';


function StudentProfile(props) {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasMessage, setHasMessage] = useState({});
  const [isError, setIsError] = useState(false);
  
  const formRefer = useRef(null);
  const loadBtn = useRef(null);
  
  useEffect(() => {
    const getDataFromAPI = () => {
      const hostname = `http://${window.location.hostname}:4000/studentprofiles`;
      axios.get(hostname)
        .then(response => {
          const dt = response.data;
          if (!dt || dt.error) {
            setStudentData({});
            if (!isError)
              setIsError(true);
          } else {
            for (const ii = 0; ii < dt.length; ii++) {
              if (dt[ii]._id === id) {
                if (!JSON.stringify(studentData) || (JSON.stringify(studentData) !== JSON.stringify(dt[ii]))) {
                  setStudentData(dt[ii]);
                  if (isError) {
                    setIsError(false);
                  }
                  setTimeout(() => {
                    if (formRefer.current) {
                      [...formRefer.current].forEach(inp => {
                        if (inp.name && dt[ii][inp.name]) {
                          inp.value = dt[ii][inp.name];
                        }
                      });
                    }
                  }, 500);
                }
                break;
              }
            }
            setTimeout(() => {
              [...formRefer.current].forEach(it => {
                if (it.name && dt[it.name])
                  it.value = dt[it.name];
              });
            }, 1000, []);
          }
          const backdrop = document.getElementsByClassName('modal-backdrop show');
          if (backdrop.length > 0) {
            for (let ib = 0; ib < backdrop.length; ib++)  { 
              backdrop[ib].remove();
            }
          }
          if (loadBtn.current) {
            loadBtn.current.click();
          }
          
        })
        .catch(() => {
          setStudentData({});
          if (loadBtn.current) {
            loadBtn.current.click();
          }
          if (!isError)
            setIsError(true);
        })
    }
    const interval = setInterval(getDataFromAPI, 1000);
    return () => clearInterval(interval);
  }, [id, studentData, loadBtn, isError, formRefer, setStudentData, setIsError]);

  const pen = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z">
      </path>
    </svg>
  );

  const onClickUpdate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const hostname = `http://${window.location.hostname}:4000/studentprofiles/${studentData._id}`;
    var newdata = {};
    [...formRefer.current].forEach(inp => {
      if (inp.name) {
        inp.classList.remove('border-danger');
        if (!inp.value) {
          inp.classList.add('border-danger');
          loadBtn.current.click();
        }
        newdata[inp.name] = inp.value;
      }
    });
    newdata.year = Number.parseInt(newdata.year);
    if (newdata.firstname === studentData.firstname && newdata.lastname === studentData.lastname && newdata.course === studentData.course && newdata.year === studentData.year) {
      loadBtn.current.click();
      setIsUpdating(!isUpdating);
    } else {
      axios.put(hostname, newdata)
        .then(response => {
          loadBtn.current.click();
          if (response.data.error) {
            setStudentData({});
            setHasMessage({error: true});
          } else {
            console.log(response.data);
            setStudentData(Object.assign({}, response.data));
            setHasMessage({success: true});
          }
          setIsUpdating(!isUpdating);
        })
        .catch((err) => {
          console.log(err);
          loadBtn.current.click();
          setHasMessage({error: true});
          [...formRefer.current].forEach(inp => {
            if (inp.name && studentData[inp.name]) {
              inp.value = studentData[inp.name];
            }
          });
          setIsUpdating(!isUpdating);
        });
      }
  };

  if (id && studentData._id) {
    return (
      <div className="box">
        <div className="box-container">
          <div className="row header">
            <Header title={props.title} path="/"/>
          </div>
          <div className="row content bg-dark">
            <div className="container">
              <div className="text-center">
                <button className="btn border-5 border-light bg-light m-2 text-primary" onClick={(e) => {
                  [...formRefer.current].forEach(inp => {
                    if (inp.name && studentData[inp.name]) {
                      inp.value = studentData[inp.name];
                    }
                  });
                  setIsUpdating(!isUpdating);
                }}>{pen} {isUpdating ? "Cancel Changes" : "Edit Profile" }</button>
              </div>
              {/* form here */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">{studentData.firstname} {studentData.lastname}</h3>
                    </div>
                    <div className="card-body">
                      <form noValidate ref={formRefer} onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isUpdating) {
                          onClickUpdate(e);
                        }
                      }}>
                        <input type="hidden" name="_id" value={studentData._id} />
                        <div className="row form-group p-2">
                          <label htmlFor="firstname" className="col-sm-2 col-form-label fw-bolder">First Name: </label>
                          <div className="col-sm-10">
                           <input type="text" readOnly={!isUpdating} name="firstname" className={isUpdating ? "form-control" : "form-control fw-bold"} placeholder={studentData.firstname}/>
                          </div>
                        </div>
                        <div className="row form-group p-2">
                          <label htmlFor="lastname" className="col-sm-2 col-form-label fw-bolder">Last Name: </label>
                          <div className="col-sm-10">
                          <input type="text" readOnly={!isUpdating} name="lastname" className={isUpdating ? "form-control" : "form-control fw-bold"} placeholder={studentData.lastname}/>
                          </div>
                        </div>
                        <div className="row form-group p-2">
                          <label htmlFor="course" className="col-sm-2 col-form-label fw-bolder">Course: </label>
                          <div className="col-sm-8">
                          <input type="text" readOnly={!isUpdating} name="course" className={isUpdating ? "form-control" : "form-control fw-bold"} placeholder={studentData.course}/>
                          </div>
                          <label htmlFor="year" className="col-sm-1 col-form-label fw-bolder">Year: </label>
                          <div className="col-sm-1">
                            <select name="year" className={isUpdating ? "form-control text-center bg-white" : "form-control text-center bg-white fw-bold"} style={{fontFamily: 'Droid Sans'}} readOnly={!isUpdating} disabled={!isUpdating}>
                              <option value="1">I</option>
                              <option value="2">II</option>
                              <option value="3">III</option>
                              <option value="4">IV</option>
                            </select>
                          </div>
                        </div>
                        <div className="row form-group pt-4 pb-3 text-center" style={{width: "10em", display: "block", marginLeft: "auto", marginRight: "auto"}}>
                          {isUpdating ? (
                            <button type="submit" className="btn border-solid bg-primary font-weight-bold text-light mw-50" data-bs-toggle="modal" data-bs-target="#submitLoading">
                            Update
                          </button>
                          ) : null}
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
          <div className="position-fixed">
            {hasMessage.success ? <Toaster title="Update Student Profile" message="Updated Successfully!" /> : null}
            {hasMessage.error ? <Toaster title="Update Student Profile" message="Failed to Update Student Information!" /> : null}
          </div>
        </div>
        {/*  <!-- Modal --> */}
        <FgLoading refer={loadBtn}/>
      </div>
    );
  }
  if (!isError) {
    return (
      <div className="box">
        <div className="box-container">
        <div className="row header">
          <Header title={props.title} path="/"/>
        </div>
        </div>
        <div className="row content bg-dark">
          <div className="container">
            <FgLoading isOpen={true}/>
          </div>
        </div>
        <div className="row footer bg-light">
          <Footer />
        </div>
      </div>
    );
  }
  return <Error404 />;
}

export default StudentProfile;