import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../components/Layout/store/mail-slice";
import useHttp from "../../components/hooks/use-http";

const ViewMail = (props) => {
    const viewMail = useSelector(state => state.mail.viewMail);
    const dispatch = useDispatch();
    const viewMailHandler = () => {
        dispatch(mailActions.mailHandler());
        console.log(viewMail);
    }
    const { sendRequest } = useHttp();

    const deleteMailHandler = async () => {
        // let url;
        // if (props.type === "received") {
        //     url = `https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${props.email}/${props.mail.id}.json`
        // } else {
        //     url = `https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${props.email}/${props.mail.id}.json`
        // }
        // await fetch(url, {
        //     method: 'DELETE'
        // })
        // if (props.type === "received") {
        //     dispatch(mailActions.deleteReceivedMail({ id: props.mail.id }));
        // } else {
        //     dispatch(mailActions.deleteSentMail({ id: props.mail.id }))
        // }
        let url;
        if (props.type === "received") {
            url = `https://mail-box-client-8f262-default-rtdb.firebaseio.com/inbox/${props.email}/${props.mail.id}.json`;
            dispatch(mailActions.deleteReceivedMail({ id: props.mail.id }));
        }else {
            url = `https://mail-box-client-8f262-default-rtdb.firebaseio.com/sent/${props.email}/${props.mail.id}.json`;
            dispatch(mailActions.deleteSentMail({ id: props.mail.id }))
        }
        sendRequest({
            url: url,
            method: 'DELETE'
        })
    };
    
    return (
        <Modal
            show={viewMail}
            onHide={viewMailHandler}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.mail.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={deleteMailHandler}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewMail;