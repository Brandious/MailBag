import React from 'react'
import { Button } from '@material-ui/core'
import  ContactMail from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';

import {config} from '../config';

const Toolbar = ({state}) => (
    <div>
        <Button variant="contained" color="primary" size="small" style={{marginRight: 10}} onClick={ () => state.showComposeMessage("new")}>
                 <EmailIcon style={{ marginRight:10 }} />New Message
        </Button>
        <Button variant="contained" color="primary" size="small" style={{marginRight: 10}} onClick={ state.showAddContact }>
                <ContactMail style={{marginRight: 10}}/>New Contact
        </Button>
        {/* <h1>{config.userEmail}</h1> */}
    </div>
)

export default Toolbar;