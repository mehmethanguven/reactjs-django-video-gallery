import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: '20px',
  },
  buttons: {
    marginTop: '5px',
  },
  cardGrid: {
    padding: '20px 0',
  },

  cardMedia: {
    paddingTop: '56.25%',
  },
  card: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: '50px 0',
  },
  imagePickerPreview: {
    width: '400px',
    height: '400px',
    borderRadius: '0.42rem',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: '3px solid #ffffff',
    boxShadow: '0 0.5rem 1.5rem 0.5rem rgb(0 0 0 / 8%)',
  },
  timer: {
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timerValue: {
    fontSize: '24px',
  },
  timerText: {
    color: '#aaa',
  },
  timerEnd: {
    width: '300px',
    fontFamily: 'Montserrat',
    color: 'red',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationCode: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  shoppingCart: {
    minHeight: '700px',
  },
  shoppingCartBody: {
    margin: '100px',
  },
  addressSelect: {
    minWidth: '400px',
    width: '400px',
  },

  dialog: {
    margin: '0 auto',
    maxWidth: 550,
  },
  textField: {
    margin: theme.spacing(1),
  },
  cancel: {
    color: 'red',
  },
  save: {
    color: 'green',
  },
  button: {
    margin: theme.spacing(2),
  },

  input: {
    display: 'none',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: '200',
  },
}));

export default useStyles;
