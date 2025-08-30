import Note from "../model/notes.model.js";

export async function createNote(req,res){
    try{
        const {title,content} = req.body
        const note = await Note.create({
            title,
            content
            
        })
    res.status(201).json({message:"note created successfully",note})
    }catch(e){
        res.status(500).json({message:"Error",e})
    }
}

export async function getNote(req,res){
    try{
        const notes = await Note.find()
        if(!notes){
            res.status(401).json({message:"notes not found in user account"})
        }
        res.status(201).json({message:"fetched all the  notes",notes})

    }catch(e){
        res.status(501).json({message:"Error in get note",e})
    }

}

export async function getNoteById(req,res){
    try{
     const note = await Note.findById(req.params.id) 
     if(!note){
        res.status(401).json({message:"note not found for the Id"})
     }
     res.status(201).json({message:"note  by id is successful",note})
    }catch(e){
        res.status(500).json({message:"Error ",e})
    }
}

export async function updateNote(req,res){
    try{
        const {title, content} =  req.body
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {new:true}

    )
    if(!note){
        res.status(401).json({message:"note not found"})
    }
    res.status(201).json({message:"notes updated successfully",note})

    }catch(e){
        res.status(500).json({message:"Error",e})
    }

}

export async function deleteNote(req,res){
    try{
        const note = await Note.findByIdAndDelete(req.params.id)
        if(!note){
            res.status(401).json({message:"note not found"})
        }
        res.status(201).json({message:"deleted successfully"})
    }catch(e){
        res.status(500).json({message:"Error",e})
    }


}