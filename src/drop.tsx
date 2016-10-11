import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Coordinator} from './drop/components/Coordinator';
import {Overlay} from './drop/components/Overlay';
import {DropPiece} from './drop/PieceData';

import {authenticate} from './auth';

export type DropCallback = (successful: boolean) => void;

export function drop(piece: DropPiece, callback: DropCallback) {
    if (!piece) {
        throw new Error('Piece argument not provided');
    }

    if (!(piece instanceof DropPiece)) {
        throw new Error('Provided piece is not an Allihoopa.DropPiece instance');
    }

    if (callback && !(callback instanceof Function)) {
        throw new Error('Provided callback is not a function');
    }

    authenticate(success => {
        if (success) {
            renderDrop(piece, callback);
        }
    });
}

function renderDrop(piece: DropPiece, callback: DropCallback) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    let successful = false;

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);

        if (callback) {
            callback(successful);
        }
    };

    const onComplete = () => {
        successful = true;
    };

    ReactDOM.render(
        <Overlay>
            <Coordinator
                input={piece}
                onClose={onClose}
                onDropComplete={onComplete}
            />
        </Overlay>,
        container
    );
}
