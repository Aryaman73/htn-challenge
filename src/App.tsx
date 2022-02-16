import { useState } from "react";
import {
  useQuery,
  gql
} from "@apollo/client";
import sortBy from "lodash/sortBy";
import Modal from "react-modal";

import './App.css';

import EventBox from "./components/EventBox";
import LoginContent from "./components/LoginContent";
import Header from "./components/Header";
import { TEvent } from "./types/eventTypes";

const EVENTS_QUERY = gql`
  query {
    sampleEvents { 
        id 
        name 
        event_type 
        permission 
        start_time 
        end_time 
        description 
        speakers { 
            name 
            profile_pic 
        } 
        public_url 
        private_url 
        related_events 
    }  
  }
`;

function App() {

  // Login Modal Functionality
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  }

  Modal.setAppElement("#root"); // For Accessibility: https://reactcommunity.org/react-modal/accessibility/


  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { loading, error, data } = useQuery(EVENTS_QUERY);

  const orderedEvents = sortBy(data?.sampleEvents, 'start_time');
  console.log(orderedEvents);

  return (
    <>
      <Header />
      <div className="main">
        <div className="button-menu">
          <button
            className="button"
            onClick={() => {
              if (!isLoggedIn) {
                setLoginModalOpen(true);
              }
              else {
                setIsLoggedIn(!isLoggedIn);
              }
            }}
          >
            {isLoggedIn ? "Log Out" : "Log In"}
          </button>
          <div className="welcome-message">
            {isLoggedIn ? "Welcome, Hacker!" : "Not Logged In"}
          </div>
        </div>
        {loading && <p> Loading... </p>}
        {error && <p> Error :( </p>}
        {!loading && !error && data && (
          orderedEvents?.map((event: TEvent) => {

            if (isLoggedIn || event?.permission === "public") {
              return (
                <div>
                  <EventBox event={event} eventList={orderedEvents} isLoggedIn={isLoggedIn} />
                </div>
              )
            } else {
              return null
            }
          })
        )}
      </div>
      <Modal
        isOpen={loginModalOpen}
        contentLabel="Login"
        onRequestClose={handleCloseModal}
      >
        <LoginContent setIsLoggedIn={setIsLoggedIn} setModal={setLoginModalOpen} />
      </Modal>
    </>
  );
}

export default App;
