import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import { Link } from 'react-router-dom';

const RegistrationStatus = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} className="mx-auto">
                    <Alert variant="warning" className="shadow-lg rounded-lg border-light text-center">
                        <i className="bi bi-hourglass-split mb-4" style={{ fontSize: '34px', color: '#f05a76' }}></i>
                        <h2 className="mb-3" style={{ color: '#f05a76' }}>
                            Your registration request is under review.
                        </h2>
                        <p className="mb-3">
                            Your request usually takes 24-48 hours to be accepted. If it is not accepted within this time frame, please contact society administration with this reference number: <strong>5387</strong>.
                        </p>
                        <p>
                            We appreciate your patience while we process your application. You will be notified via email once your registration is approved.
                        </p>
                        <Link to={"/home"}>Go back to home page</Link>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationStatus;
