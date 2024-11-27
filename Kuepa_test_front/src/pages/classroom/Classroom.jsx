import { Row } from "react-bootstrap";
import Chat from "../classroom/Chat";
import VideoPlayer from "../classroom/VideoPlayer";

const Classroom = () => {
    return (
        <Row className="g-3">
            <div className="col-sm-12 col-lg-6">
                <div className="d-flex justify-content-center align-items-center">
                    <VideoPlayer />
                </div>
            </div>
            <div className="col-sm-12 col-lg-6">
                <Chat />
            </div>
        </Row>
    );
}
 
export default Classroom;