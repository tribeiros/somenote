function NoteDao(connection) {
  this._connection = connection;
  }

  NoteDao.prototype.salva = function(note,callback) {
      this._connection.query('INSERT INTO notes SET ?',note, callback);
  }

  NoteDao.prototype.lista = function(callback) {
      this._connection.query('select * from notes',callback);
  }

  NoteDao.prototype.buscaPorId = function (id,callback) {
      this._connection.query("select * from notes where id = ?",[id],callback);
  }

  module.exports = function(){
      return NoteDao;
  };