module.exports = function(app){
  app.get('/notes', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

// view all rows on notes databes
  app.get('/notes/note/all', function(res,res){
    const connection = app.persistencia.connectionFactory();
    var queryString = 'SELECT * FROM notes';

    connection.query(queryString, function(err, rows) {
      if (err) throw err;

      for (var i in rows) {
        console.log('Id:', rows[i].id + ' ' + 'Title:', rows[i].title + ' ' + 'Content:', rows[i].content);
      }
    });
    connection.end()
  });

  app.delete('/notes/note/:id', function(req, res){
    const note = {};
    const id = req.params.id;
    note.id = id;
    note.status = 'CANCELADO';
    const connection = app.persistencia.connectionFactory();
    const noteDao = new app.persistencia.NoteDao(connection);

    noteDao.atualiza(note, function(erro){
      if (erro){
        res.status(500).send(erro);
        return;
      }
      console.log('note cancelado.')
      res.send(note);
    });
  });

  app.put('/notes/note/:id', function(req, res){
    const note = {};
    const id = req.params.id;
    note.id = id;
    note.status = 'CONFIRMADO';
    const connection = app.persistencia.connectionFactory();
    const noteDao = new app.persistencia.NoteDao(connection);

    noteDao.atualiza(note, function(erro){
        if (erro){
            res.status(500).send(erro);;
            return;
        }
        console.log('note criado.')
        res.send(note);
    });
  });

  app.post('/notes/note', function(req, res){

    req.assert("title","title eh obrigatorio").notEmpty();
    req.assert("content","content eh obrigatorio").notEmpty();

    const erros = req.validationErrors();
    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    const note = req.body;
    console.log('processando uma requisicao de um novo note');

    note.status = 'CRIADO';
    note.data = new Date;

    const connection = app.persistencia.connectionFactory();
    const noteDao = new app.persistencia.NoteDao(connection);

    noteDao.salva(note, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
      console.log('note criado');
      res.location('/notes/note/' + resultado.insertId);

      res.status(201).json(note);
      }
    });

  });
}
