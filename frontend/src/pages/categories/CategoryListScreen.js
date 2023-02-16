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
import * as actions from '../../redux/categories/categoriesActions';
import Loader from '../../components/Loader';
import { CategoryEditDialog } from '../../components/dialogs/CategoryEditDialog';
import Paginate from '../../components/Paginate';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    padding: 5,
  },
});

const CategoryListScreen = ({ history, match }) => {
  const classes = useStyles();
  let keyword = history.location.search;
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categories }),
    shallowEqual,
  );
  const {
    categories: items,
    listLoading,
    isOpenDialogEditForm,
    page,
    pages,
  } = currentState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchCategories(keyword));
  }, [dispatch, keyword]);
  const handleEdit = (row) => {
    dispatch(actions.selectCategory(row));
    dispatch(actions.handleDialogEditForm({ open: true }));
  };
  const handleOpenEditForm = () => {
    console.log('button clicked');
    //dispatch(actions.addCategory());
    dispatch(actions.handleDialogEditForm({ open: true }));
  };

  return (
    <div>
      <CategoryEditDialog open={isOpenDialogEditForm} />
      {listLoading ? (
        <Loader />
      ) : items && items.length > 0 ? (
        <div>
          <div className='pt-2 pb-5 row'>
            <div className='col-10'>
              <h4 className='text-center pt-3'>Category List</h4>
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
                  <TableCell>Name</TableCell>
                  <TableCell align='center'>Status</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items.length > 0 &&
                  items.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='center'>
                        {row.isActive ? 'Active' : 'Passive'}
                      </TableCell>

                      <TableCell align='center'>
                        <Button
                          className='mr-2'
                          variant='contained'
                          color='primary'
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className='m-3'>
              <Paginate
                pages={pages}
                page={page}
                url={'categorylist'}
                isAdmin={true}
              />
            </div>
          </TableContainer>
        </div>
      ) : (
        <div>
          <Button
            variant='contained'
            color='primary'
            style={{ float: 'right', marginLeft: '2px' }}
            onClick={handleOpenEditForm}
          >
            New
          </Button>
          <p>No category found</p>
        </div>
      )}
    </div>
  );
};

export default CategoryListScreen;
