import React, { Component } from 'react' ;
import { Col, Container, Row } from 'react-bootstrap';
import ChatboxComponent from './Chatbox';
import EditorComponent from './Editor' ;

class ContentComponent extends Component{
    render(){
        return (
            <div className="Content">
                <Container fluid className="h-100">
                    <Row className="Content-row">
                        <Col md className="Content-col pb-3" id="Content-first-col">
                            <EditorComponent />
                        </Col>
                        <Col className="Content-col">
                            <ChatboxComponent />
                        </Col>
                    </Row>
                </Container>
            </div>
        ) ;
    }
}

export default ContentComponent ;