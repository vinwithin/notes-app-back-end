const { addNoteHandler, getAllNote, getIdHandler, updateNote, deleteNote } = require("./handler");

const routes= [
    {
    method : 'POST',
    path : '/notes',
    handler : addNoteHandler,
    },
    {
        method : 'GET',
        path : './notes',
        handler : getAllNote,
    },
    {
        method :'GET',
        path : './notes/{id}',
        handler : getIdHandler,
    },
    {
        method :' PUT',
        path : './notes/{id}',
        handler : updateNote,
    },
    {
        method :'DELETE',
        path : './notes/{id}',
        handler : deleteNote,
    }
];

module.exports = routes;