import React, { useEffect, useState } from 'react'
import {TextField, Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux"
import { addContact, editContact, getContact } from '../JS/actions/contacts';
import {useHistory, useParams} from "react-router"

const AddContact = () => {
 const [contact, setContact] = useState({});
 const [edit, seteEdit] = useState(false);
 const contactToEdit = useSelector(state => state.contactReducer.contact)
 const history= useHistory();
 const dispatch = useDispatch();
 const params= useParams();

 useEffect(() => {
   if(params.id)
   dispatch(getContact(params.id))
 }, [dispatch, params.id])
 
 useEffect(() => {
   params.id? seteEdit(true):seteEdit(false)
   edit? setContact(contactToEdit):setContact({Name:"", LastName:"", Email:"", PhoneNumber:""})
 }, [edit, params.id, contactToEdit]);


const handleChange= (e)=>(
    setContact({...contact, [e.target.name]: e.target.value})
);
const handleContact=()=> {
    if(contact.Email && contact.Name){
    if(edit){
dispatch(editContact(params.id, contact))
    }else{
     dispatch(addContact(contact, history))};
} else {
    alert("This field is required");
}
};
    return <form>
        <h1> Please fill in the fields </h1>
      <TextField
        id="outlined-number"
        label="Name"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        name="Name"
        onChange={handleChange}
        value={contact.name}
      />
      <TextField
        id="outlined-number"
        label="Last Name"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        name="LastName"
        onChange={handleChange}
        value={contact.LastName}
      />{" "}
      <TextField
        id="outlined-number"
        label="Email"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        name="Email"
        onChange={handleChange}
        value={contact.Email}
      />{" "}
      <TextField
        id="outlined-number"
        label="Phone Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={contact.PhoneNumber}
        name="PhoneNumber"
        onChange={handleChange}
      />
      <Button onClick={handleContact}> {edit?"Edit":"Save"} </Button>
    </form>
};

export default AddContact;
