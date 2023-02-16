import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5 border border-primary'
            ></Form.Control>

            <Button
                type='submit'
                variant='outlined'
                className='btn btn-primary p-2'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
