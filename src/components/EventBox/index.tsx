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
    eventList: TEvent[]
};


function EventBox({ event, eventList }: Props) {

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
                    {isWorkshop && <WorkshopSVG color="#345875" width="40px" />}
                    {isActivity && <ActivitySVG color="#832161" width="40px" />}
                    {isTechTalk && <TechTalkSVG color="#4EA699" width="40px" />}
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                contentLabel={event.name}
                onRequestClose={handleCloseModal}
                style={modalStyle}
            >
                <p className="modal-heading"> {event.name} </p>
                <p> <b> Start Time: </b> {moment(event.start_time).format('dddd, MMMM Do, h:mm A')}</p>
                <p> <b> End Time: </b> {moment(event.end_time).format('dddd, MMMM Do, h:mm A')}</p>
                <p> {event.description} </p>
                {event.speakers.length > 0 && (<>
                    <p> <b> Speaker List </b> </p>
                    {event.speakers?.map((speaker: TSpeaker) => {
                        return (
                            <>
                                <p>{speaker.name}</p>
                                {/* Image is not always present... */}
                                {speaker?.profile_pic && <img className="profilePicture" alt={`{speaker.name}-profile`} src={speaker?.profile_pic} />}
                            </>
                        )
                    })}
                </>)
                }
                {event.public_url && <p> <b> Public URL: </b> {event.public_url}</p>}
                {/* TODO: Private URL only if private? */}
                {event.private_url && <p> <b>Private URL: </b> {event.private_url}</p>}
                {event?.related_events?.length > 0 && <p> <b>Related Events: </b> </p>}
                {event?.related_events?.map((eventId) => {
                    return (
                        <div>
                            {find(eventList, (i) => {
                                return i.id === eventId;
                            })?.name}
                        </div>
                    )
                })}
            </Modal>
        </>
    );
}

export default EventBox;