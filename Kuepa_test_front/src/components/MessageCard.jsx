import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

const MessageCard = ({name, timestamp, message, moderator}) => {
    const utcDate = new Date(timestamp);
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
    const day = String(utcDate.getDate()).padStart(2, '0');
    const hours = String(utcDate.getHours()).padStart(2, '0');
    const minutes = String(utcDate.getMinutes()).padStart(2, '0');

    // Formato ISO ajustado a hora local
    const fechaReal = `${year}-${month}-${day} // ${hours}:${minutes}`;
    return (
        <Card className="bg-light mb-3">
            <CardBody>
                <CardTitle style={{fontSize: '0.75em'}}>
                    <b>{name} <span style={{fontSize: '0.75em'}}>({fechaReal})</span></b>
                    {moderator&&<span style={{fontSize: '0.75em'}} className="text-primary">(Moderador)</span>}
                </CardTitle>
                <CardText>{message}</CardText>
            </CardBody>
        </Card>
    );
}
 
export default MessageCard;