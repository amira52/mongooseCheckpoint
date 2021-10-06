exports.getAllContacts = async (req, res)=>{
    try {
      const contactList=await Contact.find();
      res.send({contactList, msg:"get al contact"});  
    } catch (error) {
      res.status(400).send({msg:"failed", error});    
    }
};

exports.getContactById=async (req, res) =>{
    try {
      const {id} = req.params
      const findContact = await Contact.findById(id)
      res.send({msg:"get the contact", findContact})  
    } catch (error) {
      res.status(400).send({msg:"failed to get the contact", error})   
    }
};

exports.getOneContact=async (req, res) =>{
    try {
      const {id} = req.params
      const findOneContact = await Contact.findOne({_id:id})
      res.send({msg:"get the contact", findOneContact})  
    } catch (error) {
      res.status(400).send({msg:"failed to get the contact", error});   
    };
};

exports.addContact=async (req, res)=>{
  try {
   const findUser = await Contact.findOne({Email:req.body.Email});
   if(findUser){
     return res.status(400).send({msg:"Email should be unique"});
   }
   const newContact = new Contact({...req.body});
   await newContact.save();
   res.send({msg:"user added", newContact})
  } catch (error) {
    res.status(400).send({msg:"user not saved", error}) 
  } 
};

exports.deleteContact=async (req, res)=>{
    try {
        const {id}= req.params;
        await Contact.deleteOne({_id:id});
        res.send({msg:"delete succ"});
    } catch (error) {
        res.status(400).send({msg:"failed to delete contact", error}); 
    }
};

exports.updateContact=async (req, res)=>{
    try {
        const {id}=req.params;
        await Contact.updateOne({_id:id},{$set: {...req.body} });
        res.send({msg:"updated succ"});
    } catch (error) {
        res.status(400).send({msg:"failed to update contact", error}); 
    }
};