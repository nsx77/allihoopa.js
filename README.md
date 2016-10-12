Allihoopa.js
============

[![Travis](https://travis-ci.org/allihoopa/allihoopa.js.svg?branch=master)]()
[![npm](https://img.shields.io/npm/v/allihoopa.svg)]()

----

> Javascript SDK to interface with [Allihoopa].

# Installation

You can use this SDK in three different ways. If you use e.g. Webpack or
Browserify, you can use the NPM module directly. We export [TypeScript] type
definitions, if you use it this way.

```bash
npm install --save allihoopa
```

If you have no build system but use React on your site, you can include the
library from our CDN. React 15.0.0 or later is required.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"></script>

<script src="https://ahcdn.se/sdk-dist/allihoopa-0.2.0.min.js"></script>
```

We also build a standalone version that wraps all dependencies required by our
SDK:

```html
<script src="https://ahcdn.se/sdk-dist/allihoopa-standalone-0.2.0.min.js"></script>
```


## Development setup

See the [example] folder for how to set up an interactive development
environment.


[Allihoopa]: https://allihoopa.com
[TypeScript]: https://www.typescriptlang.org
[example]: example/



# API Documentation

## Setting up the SDK

```javascript
Allihoopa.setup({
    app: '<application identifier>',
    apiKey: '<API  key>',
});
```

This must be called before any other API calls can be made. Provide the
application identifier and API key you got when you registered your app. If
you're interested in getting your app up and running with Allihoopa, contact us
at [info@allihoopa.com](mailto:info@allihoopa.com).


## Authenticating users

```javascript
Allihoopa.authenticate(function (successful) {
    if (successful) {
        // The user is now logged in
    } else {
        // The user canceled log in/sign up
    }
});
```

This opens a login/signup dialog where the user can authenticate with Allihoopa.

If the user is already logged in on Allihoopa, the dialog will immediately close
itself and the callback called with a successful response.

The callback will also be executed if the user cancels the log in flow, by e.g.
closing the window.


## Dropping pieces

```javascript
var piece = new Allihoopa.DropPiece({
    presentation: {
        title: 'Default title', // The default title of the piece
    },
    musicalMetadata: {
        lengthMicroseconds: 12000000, // Length of the piece, in microseconds
    },
    stems: {
        mixStem: function (completion) {
            // Render or download your audio and call completion with a Blob
            // object containing the audio data in Wave or Ogg formats.
            if (hasData) {
                completion(myData);
            } else {
                // If something fails, provide an Error instance as the second
                // argument:
                completion(null, new Error('Audio rendering failure'));
            },
        },
    },
});

Allihoopa.drop(piece, function (successful) {
    if (successful) {
        // The user successfully dropped the piece
    } else {
        // The user closed the dialog without dropping, either by an error
        // or by not going through the steps.
    }
});
```

This creates a modal drop dialog on the current page. The function takes a
`DropPiece` instance and a completion callback that will be called when the user
closes the dialog. The above example contains the minimal amount of data
required to drop a piece - a default title, the audio data length, and the audio
data itself.

`DropPiece` will perform validation and raise an exception if the data is
invalid - such as loop markers being inverted or the length outside of
reasonable limits. These are *usually* programmer errors - not runtime errors
that can be handled in a meaningful way.

If your application knows about it, it can supply a lot more metadata to
`DropPiece` than described above. Here's a complete example showing all
properties you can set:

```javascript
var piece = new Allihoopa.DropPiece({
    stems: {
        mixStem: function (completion/*(mixStemBlob, error)*/) {
            // The "mix stem" is the audio data that should be used to place
            // the piece on a timeline. Call the completion handler with a Blob
            // instance when the data is available.
            //
            // The mix stem is mandatory.
        },
    },
    presentation: {
        title: 'Default title',
        coverImage: function (completion/*(coverImageBlob, error)*/) {
            // You can supply a default cover image that the user can upload,
            // or change. Call completion with a Blob containing a PNG image
            // of size 640x640, or null if none is available.
        },
        preview: function (completion/*(previewAudioBlob, error)*/) {
            // If the audio to be placed on a timeline is different from what
            // users should listen to, provide a "preview" audio Blob here.
            //
            // For example, if you're providing a short loop you can supply only
            // the loop data in a lossless format as the mix stem, and then a
            // longer track containing a few loops with fade in/out in a lossy
            // format in the preview audio.
            //
            // The preview audio is what's going to be played on the website.
            //
            // If no preview audio is provided, the mix stem will be used
            // instead.
        }
    },
    musicalMetadata: {
        lengthMicroseconds: 10000000, // Mandatory
        // If the tempo of the piece is available and fixed, provide a tempo
        // object for other applications to consume.
        tempo: {
            fixed: 121, // Allowed tempo range 1 - 999.999 BPM
        },
        // If the piece is a loop, provide the loop markers here. Both start
        // and end markers are required if the `loop` field is present.
        //
        // These refer to microsecond positions inside the mix stem audio data.
        loop: {
            startMicroseconds: 0,
            endMicroseconds: 1000,
        },
        // If the time signature is available and fixed, provide the following
        // object:
        timeSignature: {
            fixed: {
                upper: 4, // Allowed values are integers from 1 to 16
                lower: 4, // Allowed values are 2, 4, 8, 16
            },
        },
    },
    attribution: {
        // If this piece is based on other pieces, provide a list of the IDs
        // of those pieces here.
        basedOnPieces: [],
    },
});
```
