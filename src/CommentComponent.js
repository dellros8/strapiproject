import React, { Component } from 'react';

class CommentComponent extends Component {
    render() {
        let comment = this.props.comment;

        let date = comment.createdAt.split('T').join(' ');
        date = date.split('Z').join(' ');

        return (
            <div className="singlecommentbox">
                <h4>{comment.name}</h4>
                <p>{comment.text}</p>
                <p>Postat: {date}</p>
                <p>Betyg: {comment.rating} / 5</p>
            </div>
        );
    }
}

export default CommentComponent;
