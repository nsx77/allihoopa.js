import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../styles/CommonStyles';
import {CreatedPiece} from '../DropInterfaces';

export interface CompletedProps {
    dropPiece: CreatedPiece;
    closeFunction: () => void;
}

@Radium
export class CompletedView extends React.Component<CompletedProps, {}> {
    render() {
        return (
            <div style={VIEW_STYLE}>
                <div style={TITLE_STYLE}>
                    Yay, you dropped your piece
                    {' '}
                    <span style={PIECE_TITLE_STYLE}>{this.props.dropPiece.title}</span>
                </div>

                <div style={VINYL_WRAPPER}>
                    <div style={VINYL} />
                    <svg style={SLEEVE_STYLE} viewBox='0 0 100 100'>
                        <defs>
                            <clipPath id='sleeve'>
                                <path d='M0,0 L44,0 C44,8 56,8 56,0 L100,0 L100,100 L0,100' />
                            </clipPath>
                        </defs>
                        <path
                            d='M0,0 L44,0 C44,8 56,8 56,0 L100,0 L100,100 L0,100 L0,0'
                            stroke='#9b9b9b'
                            strokeWidth='0.5'
                            fill='none'
                        />
                        <image
                            xlinkHref={this.props.dropPiece.coverImage.url}
                            x='0.2'
                            y='0.2'
                            height='99.6'
                            width='99.6'
                            clipPath='url(#sleeve)'
                        />
                    </svg>
                </div>

                <a
                    href={this.props.dropPiece.url}
                    target='_blank'
                    style={[CommonStyles.FLAT_BUTTON_STYLE, PIECE_BUTTON_STYLE]}
                >
                    View on Allihoopa
                </a>
            </div>
        );
    }
}

const VIEW_STYLE: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
};

const TITLE_STYLE: React.CSSProperties = {
    fontSize: 22,
    lineHeight: 1.2,
    margin: '28px 8px 16px 8px',
    textAlign: 'center',
    letterSpacing: -0.3,
    color: CommonStyles.MASALA_COLOR,
    fontWeight: CommonStyles.FONT_WEIGHT_LIGHT,

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        fontSize: 28,
        width: 360,
        wordBreak: 'break-all',
    },
};

const PIECE_TITLE_STYLE: React.CSSProperties = {
    fontWeight: CommonStyles.FONT_WEIGHT_BOLD,
};

const PIECE_BUTTON_STYLE: React.CSSProperties = {
    background: CommonStyles.BRIGHT_MAGENTA_COLOR,
    color: '#fff',
    margin: '0 -16px -16px -16px',
    textAlign: 'center',
    alignSelf: 'stretch',
    padding: 14,
    textDecoration: 'none',

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        alignSelf: 'center',
        padding: '14px 40px',
    },
};

const SLEEVE_STYLE: React.CSSProperties = {
    position: 'relative',
};

const VINYL: React.CSSProperties = {
    backgroundImage: 'url(https://ahcdn.se/webpack-bundles/worldcup/frontend/static/worldcup_frontend/img/record-pattern.561ca0f7374e.jpg)',
    backgroundSize: 'cover',
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 8px)',
    position: 'absolute',
    top: -40,
    left: 4,
    transform: 'rotate(90deg)',
    borderRadius: '100%',
}

const VINYL_WRAPPER: React.CSSProperties = {
    width: '100%',
    margin: '0 44px',
    position: 'relative',
    maxWidth: 350,
};
