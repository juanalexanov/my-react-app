import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';




const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [schedules, setSchedules] = useState([]); // State to manage schedules
  const [tournament, setTournament] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showModalRole, setShowModalRole] = useState(false);



  useEffect(() => {
    // Fetch tournament data from the server when the component mounts
    let vartemp = axios.get('http://localhost:3001/tournament',{
      headers: {"Access-Control-Allow-Origin": "*"},
      responseType: "json",
    })
      .then(response => {
        console.log(vartemp);
        console.log(response.data);
        console.log(response.data[0].name);
        setTournament(response.data);
      })
      .catch(error => {
        console.error('Error fetching tournament data:', error);
      });
  }, []);

  const handleAddSchedule = () => {
    setShowModal(true);
  };

  const handleCreateTournament =() => {
  setShowModal2(true);
  }

  const handleShowRole = () => {
    setShowModalRole(true);
  }

  const handleSaveSchedule = (newSchedule) => {
    setSchedules([...schedules, newSchedule]);
    setShowModal(false);
  };

  const handleTourSchedule = (newTournament) => {
    setTournament([...tournament, newTournament]);
    setShowModal2(false);
  };



  const handleShowTournamentDetails = (index) => {
    setSelectedTournament(tournament[index]);
    setShowModal3(true);
  };

  

  useEffect(() => {
    if (selectedTournament) {
      // Fetch additional details for the selected tournament if needed
        axios.get(`http://localhost:3001/tournament/${selectedTournament.id}`)
        .then(response => {
          // Set additional details to the selectedTournament state
          setSelectedTournament({ ...selectedTournament, additionalDetails: response.data });
        })
        .catch(error => {
          console.error('Error fetching additional tournament details:', error);
        });
    }
  }, [selectedTournament])

  

  return (
    <div className="App">
      <header className="bg-dark text-white py-3">
        <div className="container">
          <nav className="navbar">
            <span className="navbar-brand text-white">TournaHUB</span>
            
          </nav>
        </div>
      </header>

      <main>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Your App Content Goes Here</h1>
            <button className="btn btn-success" onClick={handleAddSchedule}>
              Add Schedule
            </button>
            <button className="btn btn-success" onClick={handleCreateTournament}>
              Create Tournament
            </button>
          </div>
          {/* Tempat untuk menampilkan daftar jadwal */}
          
          <ul className="list-group mt-3">
            {schedules.map((schedule, index) => (
              <li key={index} className="list-group-item">
                <h1>List Schedule</h1>
                {schedule.name} - {schedule.date} - {schedule.times} - {schedule.venue}
              </li>
            ))}
          </ul>
          <ul className="list-group mt-3">
      
        {tournament.map((tourr, index) => (
          <li key={index} className="list-group-item" onClick={() => handleShowTournamentDetails(index)}>
            <div className="tournament-box">
              <h3>Tournament {index + 1}</h3>
              <p>
                <strong>Name:</strong> {tourr.name}<br />
                <strong>Date:</strong> {new Date(tourr.date).toLocaleDateString()}<br />
                <strong>Times:</strong> {tourr.times}<br />
                <strong>Venue:</strong> {tourr.venue}<br />
                <strong>Rules:</strong> {tourr.rules}<br />
              </p>
            </div>
          </li>
        ))}
      </ul>

        </div>
      </main>

      <footer className="mt-5 py-3 bg-dark text-white">
        <div className="container">
          <p>Tournament Management Website 2023</p>
        </div>
      </footer>

      {/* Modal untuk menambahkan jadwal */}

      {showModalRole && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModalRole(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form for adding a role */}
                {/* Customize this form based on your needs */}
                <form>
                  <div className="form-group">
                    <label htmlFor="roleName">Role Name:</label>
                    <input type="text" className="form-control" id="roleName" />
                  </div>
                  {/* Add more fields for the role form as needed */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setShowModalRole(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // eslint-disable-next-line no-sequences
                  onClick={() => (alert('Role added!'), setShowModalRole(false))}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Schedule</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Tournament Name:</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="text" className="form-control" id="date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="times">Times:</label>
                    <input type="text" className="form-control" id="times" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Venues:</label>
                    <input type="text" className="form-control" id="venue" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleSaveSchedule({
                  name: document.getElementById('name').value,
                  date: document.getElementById('date').value,
                  times: document.getElementById('times').value,
                  venue: document.getElementById('venue').value,
                })}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Tournament</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Create Format"
                  onClick={() => setShowModal2(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Form untuk menambahkan jadwal */}
                {/* Sesuaikan form ini dengan kebutuhan Anda */}
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Tournament Name:</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="text" className="form-control" id="date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="times">Times:</label>
                    <input type="text" className="form-control" id="times" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Venues:</label>
                    <input type="text" className="form-control" id="venue" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="venue">Rules:</label>
                    <input type="text" className="form-control" id="rules" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal2(false)}>
                  Create Format
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleTourSchedule({
                  name: document.getElementById('name').value,
                  date: document.getElementById('date').value,
                  times: document.getElementById('times').value,
                  venue: document.getElementById('venue').value,
                  rules: document.getElementById('rules').value
                })}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTournament && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tournament Details</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setSelectedTournament(null)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3>Tournament {tournament.indexOf(selectedTournament) + 1}</h3>
                <p>
                  <strong>Name:</strong> {selectedTournament.name}<br />
                  <strong>Date:</strong> {selectedTournament.date}<br />
                  <strong>Times:</strong> {selectedTournament.times}<br />
                  <strong>Venue:</strong> {selectedTournament.venue}<br />
                  <strong>Rules:</strong> {selectedTournament.rules}<br />
                </p>
              </div>
              <div className="modal-footer">
              <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={() => setShowModalRole(true) && setSelectedTournament(null)}
              >
                  Role
              </button>
              <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => setSelectedTournament(null)}
              >
                  Invite Player
              </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setSelectedTournament(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      



      
    </div>
  );
};

export default App;
