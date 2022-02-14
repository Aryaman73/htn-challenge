import { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import classNames from "classnames";

import { ReactComponent as WorkshopSVG } from './workshop.svg';
import { ReactComponent as ActivitySVG } from './activity.svg';
import { ReactComponent as TechTalkSVG } from './tech_talk.svg';

import "./index.css";
import { TSpeaker, TEvent } from "../../types/eventTypes";
type Props = {
    event: TEvent
};


function EventBox({ event }: Props) {

    const isWorkshop = event.event_type === "workshop";
    const isTechTalk = event.event_type === "tech_talk";
    const isActivity = event.event_type === "activity";

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    // TODO: for accessibility
    Modal.setAppElement("#root");

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
            >
                <p className="modal-heading"> {event.name} </p>
                <p> {event.event_type} </p>
                <p> Start Time: {moment(event.start_time).format('dddd, MMMM Do, h:mm A')}</p>
                <p> End Time: {moment(event.end_time).format('dddd, MMMM Do, h:mm A')}</p>
                <p> {event.description} </p>
                <p> Speakers: </p>
                {/* TODO: what if no speakers... */}
                {event?.speakers?.map((speaker: TSpeaker) => {
                    return (
                        <>
                            <p> {speaker.name}</p>
                            {/* Image is not always present... */}
                            {speaker?.profile_pic && <img alt={`{speaker.name}-profile`} src={speaker?.profile_pic} />}
                        </>
                    )
                })}
                <p> {event.public_url}</p>
                {/* TODO: Private URL only if private */}
                <p> {event.private_url}</p>




            </Modal>
        </>
    );
}

export default EventBox;