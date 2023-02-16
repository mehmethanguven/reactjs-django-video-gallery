import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  makeStyles,
} from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import * as actions from '../../redux/videos/videosActions';
import Loader from '../../components/Loader';
import { VideoEditDialog } from '../../components/dialogs/VideoEditDialog';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    padding: 5,
  },
});

const VideoListScreen = ({ history, match }) => {
  const classes = useStyles();
  let keyword = history.location.search;
  const { currentState } = useSelector(
    (state) => ({ currentState: state.videos }),
    shallowEqual,
  );
  const { videos: items, listLoading, isOpenDialogEditForm } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchVideos(keyword));
  }, [dispatch, keyword]);

  const handleOpenEditForm = () => {
    dispatch(actions.handleDialogEditForm({ open: true }));
  };
  const handleDelete = (row) => {
    dispatch(actions.deleteVideo(row._id));
  };

  return (
    <div>
      <VideoEditDialog open={isOpenDialogEditForm} />
      {listLoading ? (
        <Loader />
      ) : items && items.length > 0 ? (
        <div>
          <div className='pt-2 pb-5 row'>
            <div className='col-10'>
              <h4 className='text-center pt-3'>Video List</h4>
            </div>
            <div className='col-2'>
              <Button
                variant='contained'
                className='sm'
                color='primary'
                style={{ marginLeft: '2px' }}
                onClick={handleOpenEditForm}
              >
                New
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size='small'
              aria-label='a dense table'
              id='tableToExport'
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align='center'>TITLE</TableCell>
                  <TableCell align='center'>CATEGORY</TableCell>
                  <TableCell align='center'>URL</TableCell>
                  <TableCell align='center'>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items.length > 0 &&
                  items.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <Link to={`/video/${row._id}`}> {row._id}</Link>
                      </TableCell>
                      <TableCell align='center'>
                        <NavLink
                          style={{ color: 'blue' }}
                          to={`/video/${row._id}`}
                        >
                          {' '}
                          {row.title}
                        </NavLink>
                      </TableCell>
                      <TableCell align='center'>{row.category.name}</TableCell>
                      <TableCell align='center'>
                        <NavLink
                          style={{ color: 'blue' }}
                          to={`/video/${row._id}`}
                        >
                          {' '}
                          {row.url}
                        </NavLink>
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => handleDelete(row)}
                          aria-label='delete'
                          color='secondary'
                          size='small'
                        >
                          <i className='fas fa-trash text-danger'></i>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className='vh-100'>
          <Button
            variant='contained'
            color='primary'
            style={{ float: 'right', marginLeft: '2px' }}
            onClick={handleOpenEditForm}
          >
            NEW
          </Button>
          <div className='flex '>
            <h5>No videos found</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoListScreen;
