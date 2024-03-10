import React from "react";
import { createRoot } from 'react-dom/client';

'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'I like you.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like Me'
        );
    }
}

const root = createRoot(document.getElementById('like_button_container'));
root.render(<LikeButton />);

