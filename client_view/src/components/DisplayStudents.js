import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Toaster from './Toaster';
import TableDataStudents from './TableDataStudents';
import FgLoading from './FgLoading';


function DisplayStudents(props) {
  const [studentData, setStudentData] = useState([]);
  const [selected, setSelected] = useState({index: null, id: null, firstname: null, lastname: null, course: null, year: null});
  const [toasters, setToasters] = useState([]);
  const [loadIsOpen, setLoadIsOpen] = useState(false);

  const fgloadbtn = useRef(null);
  const openLoadbtn = useRef(null);

  useEffect(() => {
    const getDataFromAPI = () => {
      const hostname = `http://${window.location.hostname}:4000/studentprofiles`;
      axios.get(hostname)
        .then(res => {
          if (res.data.error) {
            setStudentData([]);
          } else {
            setStudentData(res.data);
            if (fgloadbtn.current && loadIsOpen) {
              fgloadbtn.current.click();
              setLoadIsOpen(false);
            }
          }
        })
        .catch(err => {
          console.error(err);
          if (fgloadbtn.current && loadIsOpen) {
            fgloadbtn.current.click();
            setLoadIsOpen(false);
          }
        });
    }

    if (studentData === null && !loadIsOpen) {
      setLoadIsOpen(true);
      if (openLoadbtn.current && !studentData.length) {
        const loadbtn = openLoadbtn.current;
        loadbtn.click();
        getDataFromAPI();
      }
    } else {
      const interval = setInterval(getDataFromAPI, 1000);
      return () => clearInterval(interval);
    }
  }, [loadIsOpen, studentData, fgloadbtn, openLoadbtn, setLoadIsOpen, setStudentData]);

  
  
  
  const onGetStudentData = () => {
    let tdata = [];
    studentData.forEach((it, i) => {
      tdata.push(<TableDataStudents key={i} data={it} index={i+1} setSelected={setSelected} />);
      return it;
    });
    return tdata;
  }

  const onToaster = (title, message) => {
    const countit = toasters.length;
    const toast_title = title;
    const toast_message = message;
    const mytid = "toast_" + Math.round(Math.random() * (countit+1) * 100);
    setToasters(toasters.concat(<Toaster key={countit} id={mytid} title={toast_title} message={toast_message}/>))
  }

  return (
    <div className="box">
      {/* <button onClick={() => {
        const countit = toasters.length;
        const title = 'Hello from ' + countit;
        const mytid = "toast_" + Math.round(Math.random() * (countit+1) * 100);
        setToasters(toasters.concat(<Toaster key={countit} id={mytid} title={title} message="Random Things"/>));
      }}>Add Toasts</button> */}
      <div className="box-container">
        <div className="row header">
          <Header title={props.title} path="/displaystudents"/>
        </div>
        <div className="row content bg-dark">
          <div className="container py-2">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Student Profile List</h3>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table table-striped table-light text-center">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Course</th>
                          <th scope="col">Year</th>
                          <th scope="col">( More Actions )</th>
                        </tr>
                      </thead>
                      <tbody>
                        {onGetStudentData()}
                      </tbody>
                    </table>
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
      <ConfirmDeleteModal data={selected} toast={onToaster} setSelected={setSelected}/>
      <div className="position-fixed">
        {toasters}
        <button className="btn hide" ref={openLoadbtn} data-bs-toggle="modal" data-bs-target="#submitLoading"></button>
      </div>
      <FgLoading refer={fgloadbtn}/>
    </div>      
  );
}


export default DisplayStudents;