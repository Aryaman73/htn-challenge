import { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import classNames from "classnames";
import find from "lodash/find";

import { ReactComponent as WorkshopSVG } from './workshop.svg';
import { ReactComponent as ActivitySVG } from './activity.svg';
import { ReactComponent as TechTalkSVG } from './tech_talk.svg';

import "./index.css";
import { TSpeaker, TEvent } from "../../types/eventTypes";
type Props = {
    event: TEvent,
    eventList: TEvent[],
    isLoggedIn: boolean,
};


function EventBox({ event, eventList, isLoggedIn }: Props) {

    const isWorkshop = event.event_type === "workshop";
    const isTechTalk = event.event_type === "tech_talk";
    const isActivity = event.event_type === "activity";

    // Modal Functionality
    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    Modal.setAppElement("#root"); // For Accessibility: https://reactcommunity.org/react-modal/accessibility/

    // Reference: https://reactcommunity.org/react-modal/styles/
    const modalStyle = {
        content: {
            border: (() => {
                if (isWorkshop) {
                    return "3px solid #345875";
                } else if (isTechTalk) {
                    return "3px solid #4EA699";
                } else if (isActivity) {
                    return "3px solid #832161";
                }
            })(),
            borderRadius: "20px",
        }
    }

    return (
        <>
            <div
                key={event.id}
                className={classNames("box", {
                    "workshop": isWorkshop,
                    "tech_talk": isTechTalk,
                    "activity": isActivity,
                })}
                onClick={() => { setModalOpen(!modalOpen) }}
            >
                <div>
                    <p className="event-name"> {event.name} </p>
                    <p> {moment(event.start_time).format('dddd, MMMM Do, h:mm A')}</p>
                </div>
                <div className="icon">
                    {/* Icon Source: https://www.svgrepo.com/collection/pixelarticons-interface-icons/ */}
                    {isWorkshop && <WorkshopSVG color="#345875" className="icon-svg" />}
                    {isActivity && <ActivitySVG color="#832161" className="icon-svg" />}
                    {isTechTalk && <TechTalkSVG color="#4EA699" className="icon-svg" />}
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                contentLabel={event.name}
                onRequestClose={handleCloseModal}
                style={modalStyle}
                closeTimeoutMS={200}
            >
                <div className="event-modal-box">
                    <h1 className="modal-heading"> {event.name} </h1>
                    <p> <b> Start Time: </b> {moment(event.start_time).format('dddd, MMMM Do, h:mm A')}</p>
                    <p> <b> End Time: </b> {moment(event.end_time).format('dddd, MMMM Do, h:mm A')}</p>
                    <p> {event.description} </p>
                    {event.public_url && <a className="modal-external-link" href={event.public_url} target="_blank" rel="noreferrer"> <b> Public URL: </b> {event.public_url}</a>}
                    {isLoggedIn && event.private_url && <a className="modal-external-link" href={event.private_url} target="_blank" rel="noreferrer"> <b>Private URL: </b> {event.private_url}</a>}

                    {event.speakers.length > 0 && (<>
                        <h3 className="modal-subheading"> Speaker List </h3>
                        {event.speakers?.map((speaker: TSpeaker) => {
                            return (
                                <div className="modal-picture-box">
                                    <p>{speaker.name}</p>
                                    {speaker?.profile_pic && <img className="profilePicture" alt={`{speaker.name}-profile`} src={speaker?.profile_pic} />}
                                </div>
                            )
                        })}
                    </>)
                    }
                    {event?.related_events?.length > 0 && <h3 className="modal-subheading"> Related Events  </h3>}
                    {event?.related_events?.map((eventId) => {
                        const relatedEvent = find(eventList, (i) => {
                            return i.id === eventId;
                        })
                        if (relatedEvent && (isLoggedIn || relatedEvent?.permission === "public")) {
                            return (
                                <div>
                                    <EventBox event={relatedEvent} eventList={eventList} isLoggedIn={isLoggedIn} />
                                </div>
                            )
                        }
                        else {
                            return null;
                        }
                    })}
                    <button
                        className="event-close-button"
                        onClick={() => {
                            setModalOpen(false);
                        }}
                    >
                        Close Event
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default EventBox;