import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderComments({comments, postComment, campsiteId}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return(
                        <div key={comment.id}>
                            <p>{comment.text}<br />
                                {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />
}


function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
                <div class="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    /> 
                </div>
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggleModal = () => {
        this.setState ({
            isModalOpen : !this.state.isModalOpen 
        })
    }

    render() {
        const { isModalOpen } = this.state
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> submit comment
                </Button>
                <Modal isOpen={isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>submit yourself</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select className="form-control" modal=".rating" id="rating" name="rating">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">your name here</Label>
                                <Control.text className="form-control" model=".author" id="author" name="author" placeholder="enter your name"></Control.text>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">comment</Label>
                                <Control.textarea classname="form-control" model=".text" id="text" name="text" rows="6"></Control.textarea>
                            </div>
                            <Button color="primary" type="submit" value="submit">submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}


export default CampsiteInfo;