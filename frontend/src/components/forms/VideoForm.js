import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as categoryActions from '../../redux/categories/categoriesActions';
import * as actions from '../../redux/videos/videosActions';
import useStyles from '../../styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const VideoForm = () => {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [fileError, setFileError] = useState('');
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categories }),
    shallowEqual,
  );
  const { categories } = currentState;
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const { register, handleSubmit, reset } = useForm({});
  const [isExists] = useState(false);

  useEffect(() => {
    dispatch(categoryActions.fetchCategories());
  }, [dispatch]);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileSizeLimit = 10000000; // 10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File size too large`);
    } else {
      const url = URL.createObjectURL(selectedFile);
      setSource(url);
      setFile(selectedFile);
      setFileError('');
    }
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const onSubmit = async ({ title, category }) => {
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('category', category);
    uploadData.append('file', file);

    dispatch(actions.addVideo(uploadData));
  };

  const handleReset = () => {
    setFile('');
    setSource('');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        {categories && categories.length > 0 && (
          <Grid item xs={12}>
            <Item className='mb-2'>
              <FormControl fullWidth>
                <select
                  name='select'
                  placeholder='Select Category'
                  id='select'
                  className='p-3'
                  {...register('category', { required: true })}
                >
                  <option value=''>Select Category</option>
                  {categories.map((i) => (
                    <option className='p-3' key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Item>
          </Grid>
        )}

        <Grid item className='text-center' xs={12}>
          <Item className='mb-2 mr-1'>
            <FormControl fullWidth>
              <TextField
                id='title'
                label='Title'
                variant='outlined'
                {...register('title', { required: true, maxLength: 80 })}
              />{' '}
            </FormControl>
          </Item>
        </Grid>

        <Grid item className='text-center' xs={12}>
          <Item className='mb-2 mr-1'>
            {/* File Uploader Start*/}
            <FormControl error={Boolean(fileError)}>
              <input
                ref={inputRef}
                id='video'
                required
                type='file'
                // accept="Video/mp3,Video/wav"
                accept='video/mp4, video/mov, video/wmv,
                        video/flv, video/avi, video/avchd, video/webm, video/mkv'
                className={classes.input}
                onChange={handleFileChange}
              />
            </FormControl>
            {/* File Uploader End*/}
            {!source && (
              <Button variant='outlined' color='primary' onClick={handleChoose}>
                Select Video
              </Button>
            )}
            {source && (
              <video
                className='VideoInput_video'
                width='100%'
                height={300}
                controls
                src={source}
              />
            )}
          </Item>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <div className='d-flex justify-content-center mt-15'>
          <Item className='m-2'>
            <Button variant='outlined' color='secondary' onClick={handleReset}>
              Reset
            </Button>
          </Item>
          <Item className='m-2'>
            <Button variant='outlined' type='submit' disabled={isExists}>
              Submit
            </Button>
          </Item>
        </div>
      </Grid>
    </form>
  );
};

export default VideoForm;
