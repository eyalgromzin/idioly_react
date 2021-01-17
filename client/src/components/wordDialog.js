import React, { useImperativeHandle, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './components.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { translateWord } from 'translateActions'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    // top: `${top}%`,
    // margin:'auto'
    // left: `${left}%`,
    // transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const wordDialog = forwardRef((props, ref) =>{ 
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.isOpen);
  const [title, setTitle] = React.useState("");
  const [word, setWord] = React.useState("");
  const [translation, setTranslation] = React.useState("");

  useImperativeHandle(ref, () => ({
    imperatoveHandleOpen(dialogTitle, word) {
        setTitle(dialogTitle)
        setWord(word)
        handleOpen()        
        translateWordAsync(word)
    },

    imperatoveHandleClose() {
        handleClose()
    }
  }));

  const handleOpen = () => {
    setOpen(true);
  }

  const translateWordAsync = (word) => {
    translateWord(word, "es", "en", translation => {
        setTranslation(translation)
    }, error => {
        alert("failed to translate word: " + error)
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const wordChanged = e => {
    setWord(e.target.value)
  }



  const translationChanged = e => {
    setTranslation(e.target.value)
  }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        style={{ alignItems: "center", justifyContent: "center", display: 'flex', }}        
      >
        <div style={modalStyle} className={classes.paper}>
            <h2 id="wordDialogHeader">{title}</h2>
            <div id="wordDialogFields">
                <TextField id="wordDialogWord" label="Word" value={word}  onChange={wordChanged} />
                <TextField id="wordDialogWord" label="Translation" value={translation} onChange={translationChanged} />
                <Button color="secondary" id="wordDialogButton" onClick={() => props.buttonClicked } >
                    Add
                </Button>
            </div>
        </div>
      </Modal>
  );
})

export default wordDialog;
