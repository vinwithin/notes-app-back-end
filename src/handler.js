const { nanoid } = require("nanoid");
const notes = require('./catatan');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const addNote = {
         title, tags, body, id, updateAt, createAt
    };
    notes.push(addNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status :'success',
            message : 'catatan berhasil ditambahkan',
            data:{
                noteId : id,
                title : title,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status :'fail',
        message : 'gagal menambahkan data',
    });
    response.code(500);
    return response;
};
const getAllNote = () => ({
    status :'succes',
    data:{
        notes,
    },
});
const getIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
    };

const updateNote = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date.toISOString();
    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };
        const response = h.response({
            status:'succes',
            message:'catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status:'fail',
        message:'gagal memperbarui catatan',
    });
    response.code(404);
    return response;
}
const deleteNote = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status:'success',
            message:'catatan berhasil dihapus',
        })
        response.code(200);
        return response;
    }
    const response = h.response({
            status:'fail',
            message:'catatan gagal dihapus',
        })
        response.code(400);
        return response;
    }

module.exports = { addNoteHandler, getAllNote, getIdHandler, updateNote, deleteNote };